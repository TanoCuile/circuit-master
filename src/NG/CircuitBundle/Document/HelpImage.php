<?php

namespace NG\CircuitBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\ODM\MongoDB\Mapping\Annotations\HasLifecycleCallbacks;
use NG\HomeBundle\Document\Image;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class HelpImage
 * @package NG\CircuitBundle\Document
 * @MongoDB\EmbeddedDocument()
 * @HasLifecycleCallbacks()
 */
class HelpImage extends Image {
    /** @var string */
    protected $custom_dir = 'components/';
    /**
     * @MongoDB\String(name="machine_name")
     */
    protected $machineName;

    /**
     * Function setter for $machineName
     *
     * @param mixed $machineName
     */
    public function setMachineName($machineName)
    {
        $this->machineName = $machineName;
        return $this;
    }

    /**
     * Function getter for $machineName
     *
     * @return mixed
     */
    public function getMachineName()
    {
        return $this->machineName;
    }
}
