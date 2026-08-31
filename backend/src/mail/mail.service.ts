import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
    private readonly resend: Resend;

    constructor() {
        this.resend = new Resend(
            process.env.RESEND_API_KEY,
        );
    }

    async sendInvitationEmail(
        email: string,
        firstName: string,
        invitationToken: string,
    ) {
        const frontendUrl =
            process.env.FRONTEND_URL ||
            'http://localhost:3000';

        const invitationUrl =
            `${frontendUrl}/accept-invite?token=${invitationToken}`;

        const { data, error } =
            await this.resend.emails.send({
                from: 'ForgeFlow <onboarding@resend.dev>',
                to: [email],
                subject: 'You have been invited to ForgeFlow',
                html: `
                    <div style="
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 40px;
                    ">
                        <h1>Welcome to ForgeFlow</h1>

                        <p>
                            Hi ${firstName},
                        </p>

                        <p>
                            You have been invited to join
                            ForgeFlow.
                        </p>

                        <p>
                            Click the button below to accept
                            your invitation and create your
                            password.
                        </p>

                        <div style="margin: 30px 0;">
                            <a
                                href="${invitationUrl}"
                                style="
                                    display: inline-block;
                                    padding: 12px 24px;
                                    background: #6d5dfc;
                                    color: #ffffff;
                                    text-decoration: none;
                                    border-radius: 6px;
                                "
                            >
                                Accept Invitation
                            </a>
                        </div>

                        <p>
                            This invitation expires in
                            24 hours.
                        </p>

                        <p>
                            If you were not expecting this
                            invitation, you can safely
                            ignore this email.
                        </p>

                        <p>
                            — ForgeFlow
                        </p>
                    </div>
                `,
            });

        if (error) {
            console.error(
                '❌ RESEND ERROR:',
                error,
            );

            throw new InternalServerErrorException(
                'Failed to send invitation email',
            );
        }

        console.log(
            '✅ INVITATION EMAIL SENT:',
            data,
        );

        return data;
    }
}
