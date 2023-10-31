const nodemailer = require("nodemailer");

export default async function POST(req, res) {
    try {
        const { name, email, phone, message } = await req.body;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'signup@bitswits.com',
                pass: "10@Kskwoks"
            }
        })

        const mailOptions = {
            from: 'signup@bitswits.com',
            to: 'signup@bitswits.com',
            subject: `New Lead Generated By BitsWits`,
            html: `<table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>${name}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>${email}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>${phone}</td>
                    </tr>
                    <tr>
                        <th>Message</th>
                        <td>${message}</td>
                    </tr>
                </tbody>
            </table>`
        }

        await transporter.sendMail(mailOptions);

        return res.json({ "message": "Email send sucessfully", "data": [name, email, phone, message], "status": 200 });
    } catch (error) {
        return res.json({ "message": "Failed to send Email", "data": error, "status": 500 });
    }
}