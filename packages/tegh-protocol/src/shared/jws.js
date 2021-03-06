import './patchJose'

import { Jose, JoseJWE, JoseJWS } from 'jose-jwe-jws'
import { pem2jwk } from 'pem-jwk'
import sshFingerprint from './sshFingerprint'

export const packJWS = async ({ payload, privateKey }) => {
  const jwk = pem2jwk(privateKey)

  const cryptographer = new Jose.WebCryptographer()
  cryptographer.setContentSignAlgorithm('RS256')

  const signer = new JoseJWS.Signer(cryptographer)
  await signer.addSigner(jwk)

  const message = await signer.sign(JSON.stringify(payload), null, {})

  return message.CompactSerialize()
}

export const unpackJWS = async (message) => {
  let payload = message.split('.')[1]
  payload = atob(payload)
  payload = JSON.parse(payload)

  const { publicKey } = payload
  const fingerprint = sshFingerprint(publicKey, 'sha256')

  const cryptographer = new Jose.WebCryptographer()
  cryptographer.setContentSignAlgorithm('RS256')

  const jwk = pem2jwk(publicKey)

  const verifier = new JoseJWS.Verifier(cryptographer, message)
  await verifier.addRecipient(jwk)
  const verifierResults = await verifier.verify()

  return {
    verified: verifierResults[0].verified,
    payload,
  }
}
