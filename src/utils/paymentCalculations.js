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