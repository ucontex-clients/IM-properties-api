// const { balancePayment } = require('./utils/paymentCalculations');

// console.log(balancePayment('12-months', 1000000, 50000));


exports.installmentalpayment =  async(req, res) => {
  const {_id} = req.user;
  const property = await Property.find(req.params.property);
  try {
    const{ transaction_id } = req.query;
    const { paymentMode, duration, plotLayouts, totalPrice, amountPaid} = req.body;
    // URL with the Transaction_ID sent from the frontend to Verify transaction
    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

    // Making an API call with Axios to verify Transaction
    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${FLUTTERWAVE_SECRET_KEY}`,
      },
    });

    const flutter = response.data.data;

    // Create a Transaction using the Transaction model 
    const data = {
      payer: _id,
      property,
      amount: flutter.amount,
      paymentMethod: "flutterwave",
      currency: flutter.currency,
      status: flutter.status,
      plotLayout: plotLayouts
    };
    // Saving the Transaction in the Database
    const transaction = await Transaction.create(data);

    
    // Check if this is a first time payment for this property or not
    const payment = await Payment.findOne({property}).populate('property');
    if(!payment) {
      const paymentData = {
        amount: parseFloat((property.width * property.length) * property.pricePerSm),
        mode: paymentMode,
        paid: flutter.amount,
        balance: amount - paid,
        duration : duration,
        transactions: transaction._id,
        nextPayment: moment().add(1, 'M'),
        property: property,
      };
  
      const newPayment = await Payment.create(paymentData);
  
      if(!newPayment) {
        console.log('failed to create payment');
        return res.status(400).json('failed to create payment');
      }

      console.log(newPayment);
      return res.status(200).json(newPayment);
    }


    payment.Payer = _id
    payment.amount= parseFloat((property.width * property.length) * property.pricePerSm);
    payment.mode = paymentMode;
    payment.paid += flutter.amount;
    payment.balance = payment.amount - payment.paid;
    payment.duration = duration;
    payment.nextPayment = moment().add(1, 'M');
    payment.transactions = payment.transactions.push(transaction._id)
    await payment.save();


    // Updating Individual PlotLayouts
    Property.updateMany(
      { 'plotLayout._id': { $in: plotLayouts}},
      { $set: { "plotLayout.$.status" : "ongoingPayment"}}
    )
    .then(result => { console.log(result); })
    .catch(error => { console.error(error); });

  // For FInal Payments
  if(payment.paid == payment.amount) {
          // Allocating Commissions to ESP
      const referer = await ESP.findById(req.user.referer);
      if(!referer){
        console.log('ESP not found');
        return res.status(200).json('ESP not found')
      };
      const referralsUpline = referer.referer;
      const commission = directDownlinePercentage(referer.level, payment.amount);
      referer.commissionBalance += commission;
      referer.paidDownline.push(_id);
      referer.save();

      // Allocating Commission to Upline
      if(referralsUpline){
        const upline = await ESP.findById(referralsUpline);
        const downlineCommission = commissionFromDownline(upline.level, payment.amount);
        upline.commissionBalance += downlineCommission;
        upline.paidSecondDownline.push(_id);
        upline.save();
      }
  }

  console.log(payment);
  return res.status(200).json(payment);

} catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}


exports.outrightPayment = async(req, res) => {
  const {_id} = req.user;
  const property = await Property.find(req.params.property);
  try {
    const{ transaction_id } = req.query;
    const { paymentMode, plotLayouts, totalPrice, amountPaid} = req.body;
    // URL with the Transaction_ID sent from the frontend to Verify transaction
    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

    // Making an API call with Axios to verify Transaction
    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${FLUTTERWAVE_SECRET_KEY}`,
      },
    });

    const flutter = response.data.data;

    // Create a Transaction using the Transaction model 
    const data = {
      payer: _id,
      property,
      amount: flutter.amount,
      paymentMethod: "flutterwave",
      currency: flutter.currency,
      status: flutter.status,
      plotLayout: plotLayouts
    };

    // Saving the Transaction in the Database
    const transaction = await Transaction.create(data);

    // If its an OutRight Payment
    if(paymentMode === 'outright' && amountPaid == totalPrice ){
      const paymentData = {
        amount: parseFloat(totalPrice),
        mode: paymentMode,
        paid: flutter.amount,
        balance: 0,
        transactions: transaction._id,
        property: property,
      };

      const payment = await new Payment.save(paymentData);
      if(!payment){
        console.log('Could not create Payment');
        return res.status(404).json('Could not create Payment')
      }

      // Updating Individual PlotLayouts
      Property.updateMany(
        { 'plotLayout._id': { $in: plotLayouts}},
        { $set: { "plotLayout.$.status" : "Sold"}}
      )
      .then(result => { console.log(result); })
      .catch(error => { console.error(error); });

      // Allocating Commissions to ESP
      const referer = await ESP.findById(req.user.referer);
      if(!referer){
        console.log('ESP not found');
        return res.status(200).json('ESP not found')
      };
      const referralsUpline = referer.referer;
      const commission = directDownlinePercentage(referer.level, totalPrice);
      referer.commissionBalance += commission;
      referer.paidDownline.push(_id);
      referer.save();

      // Allocating Commission to Upline
      if(referralsUpline){
        const upline = await ESP.findById(referralsUpline);
        const downlineCommission = commissionFromDownline(upline.level, totalPrice);
        upline.commissionBalance += downlineCommission;
        upline.paidSecondDownline.push(_id);
        upline.save();
      }

      console.log(payment);
      return res.status(200).json(payment);
    }

  } catch(error){
    console.log(error.message);
    return res.status(500).json(error.message);
  }

}


exports.firstPaymentOfInstallmentPayment = async(req, res) => {
  const {_id} = req.user;
  const property = await Property.find(req.params.property);
  try {
    const{ transaction_id } = req.query;
    const { paymentMode, duration, plotLayouts, totalPrice, amountPaid} = req.body;
    // URL with the Transaction_ID sent from the frontend to Verify transaction
    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

    // Making an API call with Axios to verify Transaction
    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${FLUTTERWAVE_SECRET_KEY}`,
      },
    });

    const flutter = response.data.data;

    // Create a Transaction using the Transaction model 
    const data = {
      payer: _id,
      property,
      amount: flutter.amount,
      paymentMethod: "flutterwave",
      currency: flutter.currency,
      status: flutter.status,
      plotLayout: plotLayouts
    };
    // Saving the Transaction in the Database
    const transaction = await Transaction.create(data);

    // const result = balancePayment( duration, property.)

    // Check if this is a first time payment for this property or not
    const paymentData = {
      amount: parseFloat((property.width * property.length) * property.pricePerSm),
      mode: paymentMode,
      paid: flutter.amount,
      balance: amount - paid,
      duration : duration,
      transactions: transaction._id,
      nextPayment: moment().add(1, 'M'),
      property: property,
    };

    const newPayment = await Payment.create(paymentData);

    if(!newPayment) {
      console.log('failed to create payment');
      return res.status(400).json('failed to create payment');
    }

    console.log(newPayment);
    return res.status(200).json(newPayment);
    
  }
  catch(error){
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

exports.update = async (req, res) => {
  try {
    const plotLayouts = req.body.plotLayouts;
    console.log(plotLayouts);
        // Updating plot Layouts in Property
        Property.updateMany(
          { 'plotLayout._id': { $in: plotLayouts}},
          { $set: { "plotLayout.$[].status" : "ongoingPayment"}},
          { multi: true, arrayFilters: [{ "element._id": { $in: plotLayouts } }] }
        )
        .then(result => { 
          console.log(result);
          return res.status(200).json(result);
         })
        .catch(error => { console.error(error); });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}