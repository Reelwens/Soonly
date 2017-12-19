<?php

namespace ApiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * VideoAttachement
 *
 * @ORM\Table(name="video_attachement")
 * @ORM\Entity(repositoryClass="ApiBundle\Repository\VideoAttachementRepository")
 */
class VideoAttachement extends Attachement
{

    /**
     * @var string
     *
     * @ORM\Column(name="video", type="string", length=255)
     */
    private $video;
    
    /**
     * Set video
     *
     * @param string $video
     *
     * @return VideoAttachement
     */
    public function setVideo($video)
    {
        $this->video = $video;
        
        return $this;
    }

    /**
     * Get video
     *
     * @return string
     */
    public function getVideo()
    {
        return $this->video;
    }
}

