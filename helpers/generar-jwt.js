import jwt from "jsonwebtoken";

export const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '10m'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    })
}

export const generarRefreshToken = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1h'
        }, (err, refreshToken) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el refresh token');
            } else {
                resolve(refreshToken);
            }
        });
    });
}