// const { Clickup } = require('clickup.js');
// const token = 'pk_67274323_GASAFSOCN3K1O9JCHR0BWZ5QZJOO8FPF'
// const clickup = new Clickup(token);


// (async () => {
//   try {
//    // get a specific task
//    const { body } = await clickup.tasks.get('9hz');
//    console.log(body);
//   } catch (error) {
//    if (error.response) {
//     // The request was made and the server responded with a status code
//     // that falls out of the range of 2xx
//     console.log(error.response.body);
//     console.log(error.response.statusCode);
//     console.log(error.response.headers);
//    } else if (error.request) {
//     // The request was made but no response was received
//     console.log(error.request);
//    } else {
//     // Something happened in setting up the request that triggered an Error
//     console.log('Error', error.message);
//    }
//    console.log(error.options);
//   }
//  })

import React from 'react'

const Clickup = () => {
  return (
    <div>Clickup</div>
  )
}

export default Clickup