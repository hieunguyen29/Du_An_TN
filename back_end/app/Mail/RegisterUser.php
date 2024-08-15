<?php

namespace App\Mail;

use App\Models\User;
use App\Models\UsersModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RegisterUser extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    /**
     * Create a new message instance.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Taì khoản đã được tạo',
        );
    }
    /**
     * Build the message.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.register_user',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
