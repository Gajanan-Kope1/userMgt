exports.emailData = async (data) => {
	const user_name = `${data.f_name || ""} ${data.l_name || ""}`.trim();
	return `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            text-align: center;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }
        .content p {
            margin: 10px 0;
        }
        .content .info {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            padding: 10px;
            border-top: 1px solid #ddd;
            background: #f9f9f9;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to Our Service!</h1>
        </div>
        <div class="content">
            <p>Hi <strong>${user_name}</strong>,</p>
            <p>Thank you for registering with us. Here are your login details:</p>
            <div class="info">
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Password:</strong> ${data.password}</p>
            </div>
            <p>Please keep this information safe. You can log in anytime using the above details</p>
        </div>
    </div>
</body>
</html>
`;
};

