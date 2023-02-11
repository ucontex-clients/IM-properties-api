 const express = require('express');
 const Property = require('../../models/PropertySchema');

 const addPlots = async(req, res) => {
  try {
    const id = req.params.id;
    const property = await Property.findById(id);
    if(!property){
      console.log('Property does not exist');
      return res.status(401).json("Property does not exist");
    }
    const { length, width, color } = req.body;
    const plotSqm = parseInt(length * width);
    if(plotSqm > property.totalPlotSize){
      console.log('Invalid Plot dimensions');
      return res.status(401).json('Invalid Plot dimensions');
    }

    const plotPrice = plotSqm * property.pricePerSm;
    const updatedprops = await Property.findByIdAndUpdate(id, {
      $push:{
        plotLayout: {
          $each: [{
            width: width,
            length: length,
            color: color,
            price:plotPrice
          }            
          ]
        }
      }
    });

    if(!updatedprops) {
      console.log('Failed to Update Property');
      return res.status(401).json('Failed to Update Property');
    }

    console.log(updatedprops);
    return res.status(200).json(updatedprops);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
 }

 module.exports = addPlots;