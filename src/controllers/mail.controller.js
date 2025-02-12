import nodemailer from 'nodemailer';
import config from '../config/config.js';
import path from 'path';

const __dirname = path.resolve();

const transport = nodemailer.createTransport({
    service: config.mailService,
    port: config.mailPort,
    auth: {
        user: config.mailFrom,
        pass: config.mailPass,
    }
});

export const enviarCorreo = async (req, res) => {
    try {
        const { destinatario, asunto, mensaje } = req.body;
        let result = await transport.sendMail({
            from: config.mailFrom,
            to: destinatario || config.mailFrom,
            subject: asunto || "Correo de prueba",
            html: `
                <div>
                    <h1>${mensaje || "¡Esto es mi correo personalizado!"}</h1>
                    <img src="cid:perrito1"/>
                </div>
            `,
            attachments: [
                {
                    filename: 'perrito1.png',
                    path: path.join(__dirname, 'images', 'perrito1.png'),
                    cid: 'perrito1'
                },
                {
                    filename: 'documento.pdf',
                    path: path.join(__dirname, 'documents', 'documento.pdf'),
                }
            ]
        });
        res.send({ status: "success", result: "Email sent" });
    } catch (error) {
        console.log("Error al enviar mail.", error);
        res.status(500).send({ status: "error", message: "Error al enviar el correo" });
    }
};
