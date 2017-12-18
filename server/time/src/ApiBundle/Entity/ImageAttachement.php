<?php

namespace ApiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ImageAttachement
 *
 * @ORM\Table(name="image_attachement")
 * @ORM\Entity(repositoryClass="ApiBundle\Repository\ImageAttachementRepository")
 */
class ImageAttachement extends Attachement
{

    /**
     * @var string
     *
     * @ORM\Column(name="base64", type="text")
     */
    private $base64;
    
    /**
     * Set base64
     *
     * @param string $base64
     *
     * @return ImageAttachement
     */
    public function setBase64($base64)
    {
        $this->base64 = $base64;
    
        return $this;
    }

    /**
     * Get base64
     *
     * @return string
     */
    public function getBase64()
    {
        return $this->base64;
    }
}

