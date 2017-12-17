<?php

namespace ApiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MessageAttachement
 *
 * @ORM\Table(name="message_attachement")
 * @ORM\Entity(repositoryClass="ApiBundle\Repository\MessageAttachementRepository")
 */
class MessageAttachement extends Attachement
{

    /**
     * @var string
     *
     * @ORM\Column(name="message", type="text")
     */
    private $message;

    /**
     * @var string
     *
     * @ORM\Column(name="theme", type="string", length=255)
     */
    private $theme;
    
    
    /**
     * Set message
     *
     * @param string $message
     *
     * @return MessageAttachement
     */
    public function setMessage($message)
    {
        $this->message = $message;

        return $this;
    }

    /**
     * Get message
     *
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Set theme
     *
     * @param string $theme
     *
     * @return MessageAttachement
     */
    public function setTheme($theme)
    {
        $this->theme = $theme;

        return $this;
    }

    /**
     * Get theme
     *
     * @return string
     */
    public function getTheme()
    {
        return $this->theme;
    }
}
