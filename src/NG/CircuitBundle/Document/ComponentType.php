<?php

namespace NG\CircuitBundle\Document;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\ODM\MongoDB\Mapping\Annotations\HasLifecycleCallbacks;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class for ComponentType
 *
 * @MongoDB\Document(
 *     collection="component_type",
 *     indexes={
 *         @MongoDB\Index(keys={"_id"="asc", "ng.component_type"="asc"}, options={"background"="true"}),
 *     },
 *     requireIndexes=false
 * )
 * @HasLifecycleCallbacks()
 */
class ComponentType {
    const BASE_UPLOAD_DIR = '/uploads/';

    const COMPONENT_AREA_ELECTRIC = 'electric';
    const COMPONENT_AREA_PNEUMO = 'pneumo';

    /** @var string */
    protected $small_images_dir = 'components/';
    protected $big_images_dir = 'components/previews';
    /**
     * @MongoDB\Id
     */
    private $id;

    /**
     * @MongoDB\String(name="name")
     */
    protected $name;

    /**
     * @MongoDB\String(name="machine_name")
     */
    protected $machineName;

    /**
     * @MongoDB\String(name="area")
     */
    protected $area;

    /**
     * @MongoDB\ReferenceOne(targetDocument="ComponentGroup")
     */
    protected $group;

    /**
     * @MongoDB\EmbedMany(targetDocument="Pin")
     */
    protected $pinCollection;

    /**
     * @MongoDB\String(name="image")
     */
    protected $image;

    /**
     * @MongoDB\String(name="preview")
     */
    protected $preview;

    /**
     * @MongoDB\EmbedMany(targetDocument="HelpImage")
     */
    protected $helpImages;

    /**
     * @MongoDB\ReferenceMany(targetDocument="ComponentType")
     */
    protected $variants;

    function __construct()
    {
        $this->image = static::getDefaultPreviewPath();
        $this->variants = new ArrayCollection();
        $this->helpImages = new ArrayCollection();
        $this->pinCollection = new ArrayCollection();
    }

    public  static function getDefaultPreviewPath()
    {
        return '';
    }

    /**
     * Function getter for $id
     *
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Function setter for $image
     *
     * @param mixed $image
     */
    public function setImage($image)
    {
        $this->image = $image;
        return $this;
    }

    /**
     * Function getter for $image
     *
     * @return mixed
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Function setter for $preview
     *
     * @param mixed $preview
     */
    public function setPreview($preview)
    {
        $this->preview = $preview;
        return $this;
    }

    /**
     * Function getter for $preview
     *
     * @return mixed
     */
    public function getPreview()
    {
        return $this->preview;
    }

    /**
     * Function setter for $small_images_dir
     *
     * @param string $custom_dir
     */
    public function setSmallImagesDir($custom_dir)
    {
        $this->small_images_dir = $custom_dir;
        return $this;
    }

    /**
     * Function getter for $small_images_dir
     *
     * @return string
     */
    public function getSmallImagesDir()
    {
        return $this->small_images_dir;
    }

    /**
     * Function setter for $big_images_dir
     *
     * @param string $big_images_dir
     */
    public function setBigImagesDir($big_images_dir)
    {
        $this->big_images_dir = $big_images_dir;
        return $this;
    }

    /**
     * Function getter for $big_images_dir
     *
     * @return string
     */
    public function getBigImagesDir()
    {
        return $this->big_images_dir;
    }

    public function getAbsolutePath()
    {
        return null === $this->image ? null : $this->getUploadRootDir() . $this->image;
    }

    public function getPreviewAbsolutePath()
    {
        return null === $this->preview ? null : $this->getUploadRootDir() . $this->preview;
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
        return null === $this->image ? null : static::BASE_UPLOAD_DIR . $this->image;
    }

    public function setWebPath($path) {
        return $this->setImage($path);
    }

    public function getPreviewWebPath()
    {
        return null === $this->preview ? null : static::BASE_UPLOAD_DIR . $this->preview;
    }

    public function setPreviewWebPath($path) {
        return $this->setPreview($path);
    }

    protected function getUploadRootDir()
    {
        return static::getImageAbsolutePath();
    }

    public function bigImageUpload() {
        if (null === $this->preview) {
            return;
        }

        $this->setPreview($this->upload($this->image, $this->big_images_dir));
    }

    public function smallImageUpload() {
        if (null === $this->image) {
            return;
        }
        $this->setImage($this->upload($this->image, $this->small_images_dir));
    }

    public function upload($path, $dir){
        /**
         * @var $path UploadedFile
         */
        $extension = pathinfo($path->getClientOriginalName(), PATHINFO_EXTENSION);
        $fileName = substr(sha1($path->getClientOriginalName()), 0, 25) . '.' . $extension;
        $path->move($this->getUploadRootDir() . $dir, $fileName);

        // set the path property to the filename where you'ved saved the file
        return $dir . $fileName;
    }

    /**
     * @MongoDB\PrePersist()
     * @MongoDB\PreUpdate()
     */
    public function uploadCheck() {
        if (is_object($this->image) && $this->image instanceof UploadedFile) {
            $this->smallImageUpload();
        }
        if (is_object($this->preview) && $this->preview instanceof UploadedFile) {
            $this->bigImageUpload();
        }
    }

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

    /**
     * Function setter for $name
     *
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Function getter for $name
     *
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Function setter for $pinCollection
     *
     * @param mixed $pinCollection
     */
    public function setPinCollection($pinCollection)
    {
        $this->pinCollection = $pinCollection;
        return $this;
    }

    /**
     * Function getter for $pinCollection
     *
     * @return mixed
     */
    public function getPinCollection()
    {
        return $this->pinCollection;
    }

    /**
     * Function setter for $variants
     *
     * @param mixed $variants
     */
    public function setVariants($variants)
    {
        $this->variants = $variants;
        return $this;
    }

    /**
     * Function getter for $variants
     *
     * @return mixed
     */
    public function getVariants()
    {
        return $this->variants;
    }

    /**
     * Function setter for $helpImages
     *
     * @param mixed $helpImages
     */
    public function setHelpImages($helpImages)
    {
        $this->helpImages = $helpImages;
        return $this;
    }

    /**
     * Function getter for $helpImages
     *
     * @return mixed
     */
    public function getHelpImages()
    {
        return $this->helpImages;
    }

    /**
     * Add pinCollection
     *
     * @param Pin $pinCollection
     */
    public function addPinCollection(Pin $pinCollection)
    {
        $this->pinCollection[] = $pinCollection;
    }

    /**
     * Remove pinCollection
     *
     * @param Pin $pinCollection
     */
    public function removePinCollection(Pin $pinCollection)
    {
        $this->pinCollection->removeElement($pinCollection);
    }

    /**
     * Add helpImage
     *
     * @param HelpImage $helpImage
     */
    public function addHelpImage(HelpImage $helpImage)
    {
        $this->helpImages[] = $helpImage;
    }

    /**
     * Remove helpImage
     *
     * @param HelpImage $helpImage
     */
    public function removeHelpImage(HelpImage $helpImage)
    {
        $this->helpImages->removeElement($helpImage);
    }

    /**
     * Add variant
     *
     * @param ComponentType $variant
     */
    public function addVariant(ComponentType $variant)
    {
        $this->variants[] = $variant;
    }

    /**
     * Remove variant
     *
     * @param ComponentType $variant
     */
    public function removeVariant(ComponentType $variant)
    {
        $this->variants->removeElement($variant);
    }

    /**
     * Function setter for $area
     *
     * @param mixed $area
     */
    public function setArea($area)
    {
        $this->area = $area;
        return $this;
    }

    /**
     * Function getter for $area
     *
     * @return mixed
     */
    public function getArea()
    {
        return $this->area;
    }

    /**
     * Function setter for $group
     *
     * @param mixed $group
     */
    public function setGroup($group)
    {
        $this->group = $group;
        return $this;
    }

    /**
     * Function getter for $group
     *
     * @return mixed
     */
    public function getGroup()
    {
        return $this->group;
    }

    public static function getAreaLabels(){
        $labels = array(
            static::COMPONENT_AREA_ELECTRIC => 'Електрика',
            static::COMPONENT_AREA_PNEUMO => 'Пневматика'
        );
        return $labels;
    }

    public function __toString(){
        if ($this->getName()) {
            return $this->getName();
        }
        return '';
    }
}
