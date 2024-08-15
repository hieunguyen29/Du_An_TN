<?php

namespace App\Mail;

use App\Models\DatTour;
use App\Models\HoaDon;
use App\Models\ThanhToan;
use App\Models\TourModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DatHang extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $createDatTour;
    public $tourone;
    // public $latestThanhToan;
    public function __construct(DatTour $createDatTour, TourModel $tourone)
    {
        //
        $this->createDatTour= $createDatTour;
        $this->tourone= $tourone;
        // $this->latestThanhToan= $latestThanhToan;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Dat Hang',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.datHang',
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
