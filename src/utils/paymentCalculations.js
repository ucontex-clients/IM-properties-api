exports.directDownlinePercentage = (refererStatus, amount) => {
  if(refererStatus === "star1"){
    const newAmount = amount - 50000;
    return newAmount * 0.1
  }
  else if(refererStatus === 'team-leader'){
    const newAmount = amount - 50000;
    return newAmount * 0.11
  }
  else if(refererStatus === 'super-partner'){
    const newAmount = amount - 50000;
    return newAmount * 0.12
  }
  else if(refererStatus === 'diamond-director'){
    const newAmount = amount - 50000;
    return newAmount * 0.13
  }
};

exports.commissionFromDownline = (refererStatus, amount) => {
  if(refererStatus === "star1"){
    const newAmount = amount - 50000;
    return newAmount * 0.01
  }
  else if(refererStatus === 'team-leader'){
    const newAmount = amount - 50000;
    return newAmount * 0.01
  }
  else if(refererStatus === 'super-partner'){
    const newAmount = amount - 50000;
    return newAmount * 0.02
  }
  else if(refererStatus === 'diamond-director'){
    const newAmount = amount - 50000;
    return newAmount * 0.02
  }
};

exports.balancePayment = (paymentDuration, totalAmount, amountPaid) => {
  if(paymentDuration == '3-months') {
    const differences = totalAmount - amountPaid;
    const percentage = differences * 0.1;
    const newTotalAmount = differences + percentage;
    const Payment = (newTotalAmount /3); 
    const monthlyPayment = Math.ceil(Payment);

    return {monthlyPayment, newTotalAmount, percentage, differences};
  }
  
  else if(paymentDuration == '6-months') {
    const differences = totalAmount - amountPaid;
    const percentage = differences * 0.2;
    const newTotalAmount = differences + percentage;
    const Payment = (newTotalAmount /6); 
    const monthlyPayment = Math.ceil(Payment);

    return {monthlyPayment, newTotalAmount, percentage, differences};
  }

  else {
    const differences = totalAmount - amountPaid;
    const percentage = differences * 0.4;
    const newTotalAmount = differences + percentage;
    const Payment = (newTotalAmount /12); 
    const monthlyPayment = Math.ceil(Payment);

    return {monthlyPayment, newTotalAmount, percentage, differences};
  }
}