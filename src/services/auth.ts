import crypto from 'crypto'

function decodeKey(key: string, target: string) {
    const decoded = crypto.publicDecrypt(
        {
            key: key,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(target, 'hex'),
    )
    return decoded.toString('hex')
}

export function encrypt(key: string, target: string) {
    const encoded = crypto.publicEncrypt(
        {
            key: key,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(target, 'hex'),
    )
    return encoded.toString('hex')
}

export function encryptPasswd(publicKey: string, key: string, target: string) {
    const decodedKey = decodeKey(publicKey, key)
    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(decodedKey, 'hex'), iv)
    const encryptData = cipher.update(target, 'utf-8', 'hex')
    const result = encryptData + cipher.final('hex')
    return {
        encrypted: encrypt(publicKey, result),
        iv: iv.toString('base64'),
        tag: cipher.getAuthTag().toString('hex'),
    }
}
