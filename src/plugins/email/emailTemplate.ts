export const htmlBodyRaffleWinner = (randomTicket: any) => {
	return `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 30px;
            font-family: Arial, sans-serif;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
        }
        .header {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        .content {
            margin: 20px 0;
            line-height: 1.6;
        }
        .winner-name {
            color: #27ae60;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
        }
        .details {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            color: #7f8c8d;
            margin-top: 30px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #27ae60;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="header">🎉 Congratulations! You've Won! 🎉</h1>
        
        <div class="content">
            <p>Dear <span class="winner-name">${
							randomTicket.user.name
						}</span>,</p>
            
            <p>We're excited to inform you that you've been selected as the winner in our raffle!</p>
            
            <div class="details">
                <p><strong>Prize Details:</strong></p>
                <p>• Raffle Ticket ID: ${randomTicket.id}</p>
                <p>• Winning Date: ${new Date().toLocaleDateString()}</p>
            </div>

            <p>Please respond to this email within 3 business days to claim your prize.</p>

            <p style="text-align: center;">
                <a href="[YOUR_CLAIM_URL_HERE]" class="button">Claim Your Prize</a>
            </p>

            <p>Best regards,<br>
            The Raffle Team</p>
        </div>

        <div class="footer">
            <p>This is an automated message - please do not reply directly to this email</p>
            <p>© ${new Date().getFullYear()}  All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};
