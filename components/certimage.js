import React, { Component } from 'react';
import { Divider, Image } from 'semantic-ui-react';
const src = '/static/cert.png'

const CertImage = () => (
  <div>
    <Image src={src} size='large' />
  </div>
)

export default CertImage


