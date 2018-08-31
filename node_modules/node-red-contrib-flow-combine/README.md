Node-red Flow Combine
========================

[![RedConnect Approved](https://img.shields.io/badge/RedConnect-Approved-brightgreen.svg?style=flat)](https://www.redconnect.io/addons/flow-combine/)

Install
-------

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-flow-combine

## Overview

Combine multiple flows into one waiting until a number (static or dynamic) of iterations are made.


## Combine Start

This node defines from which point the flow splits.

The node have the following properties :

### Wait an Array

If this property is checked, then the number of iterations which *Combine End* waits is the length of the Array.

### Iterate over the Array
Split the Array on multiple messages.


### Number of flows

If the other property is unchecked then the node *Combine End* will wait the number written in this property.

## Combine End

This node doesn't produce any Output until all the expected iterations are done.


The node have the following properties :

### Output processed data

If this property is checked, then the node collects in an Array, data from each iteration and at the end provides that in the payload.
If on the start node is enabled *Iterate over the Array* the elements of the result Array have the same order as in the input Array.
