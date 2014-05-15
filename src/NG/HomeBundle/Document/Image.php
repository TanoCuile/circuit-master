<?php

namespace NG\HomeBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\ODM\MongoDB\Mapping\Annotations\HasLifecycleCallbacks;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class Image
 * @package NG\HomeBundle\Document
 * @MongoDB\MappedSuperclass()
 * @HasLifecycleCallbacks()
 */
class Image {
    /**
     * @MongoDB\Id()
     */
    private $id;

    const BASE_UPLOAD_DIR = '/uploads/';

    /** @var string */
    protected $custom_dir = 'others/';

    /**
     * @MongoDB\String(name="path")
     */
    protected $path;

    function __construct()
    {
        $this->path = static::getDefaultPreviewPath();
    }

    public  static function getDefaultPreviewPath()
    {
        return '';
    }

    /**
     * Function getter for $id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Function setter for $path
     *
     * @param mixed $path
     */
    public function setPath($path)
    {
        $this->path = $path;
        return $this;
    }

    /**
     * Function getter for $path
     *
     * @return mixed
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * Function setter for $small_images_dir
     *
     * @param string $custom_dir
     */
    public function setCustomDir($custom_dir)
    {
        $this->custom_dir = $custom_dir;
        return $this;
    }

    /**
     * Function getter for $small_images_dir
     *
     * @return string
     */
    public function getCustomDir()
    {
        return $this->custom_dir;
    }

    public function getAbsolutePath()
    {
        return null === $this->path ? null : $this->getUploadRootDir() . $this->path;
    }

    public static function getImageAbsolutePath($path = '') {
        $directory = __DIR__ . '/../../../../web' . static::BASE_UPLOAD_DIR;
        if (empty($path) || !is_string($path)) {
            return $directory;
        }
        return $directory . $path;
    }

    public function getWebPath()
    {
        return null === $this->path ? null : static::BASE_UPLOAD_DIR . $this->path;
    }

    public function setWebPath($path) {
        return $this->setPath($path);
    }

    protected function getUploadRootDir()
    {
        return static::getImageAbsolutePath();
    }

    public function upload(){
        // the file property can be empty if the field is not required
        if (null === $this->path) {
            return;
        }

        /**
         * @var $path UploadedFile
         */
        $path = $this->path;
        $extension = pathinfo($path->getClientOriginalName(), PATHINFO_EXTENSION);
        $fileName = substr(sha1($path->getClientOriginalName()), 0, 25) . '.' . $extension;
        $path->move($this->getUploadRootDir() . $this->custom_dir, $fileName);

        // set the path property to the filename where you'ved saved the file
        $this->setPath($this->custom_dir . $fileName);

        // clean up the file property as you won't need it anymore
        $this->file = null;
    }

    /**
     * @MongoDB\PrePersist()
     * @MongoDB\PreUpdate()
     */
    public function uploadCheck() {
        if (is_object($this->path) && $this->path instanceof UploadedFile) {
            $this->upload();
        }
    }

    public function __toString() {
        if ($this->getWebPath()) {
            return $this->getWebPath();
        }
        return '';
    }
}