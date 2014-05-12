<?php

namespace NG\HomeBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ODM\MongoDB\Mapping\Annotations\HasLifecycleCallbacks;

/**
 * Class for blog
 *
 * @MongoDB\Document(
 *     collection="blog",
 *     indexes={
 *         @MongoDB\Index(keys={"_id"="asc", "ng.blog"="asc"}, options={"background"="true"}),
 *     },
 *     requireIndexes=false
 * )
 * @HasLifecycleCallbacks()
 */
class Blog
{
    /**
     * @MongoDB\Id
     */
    private $id;

    /**
     * @MongoDB\String(name="url")
     */
    protected $url;

    /**
     * @MongoDB\String(name="title")
     */
    protected $title;

    /**
     * @MongoDB\String(name="text")
     */
    protected $text;

    /**
     * @MongoDB\String(name="description")
     */
    protected $description;

    /**
     * @MongoDB\ReferenceOne(targetDocument="NG\UserBundle\Document\User", simple=true)
     */
    protected $author;

    /**
     * @MongoDB\Date(name="created")
     */
    protected $created;

    /**
     * @MongoDB\Boolean(name="published")
     */
    protected $published;

    function __construct()
    {
        $this->created = new \DateTime();
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
     * Function setter for $title
     *
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    /**
     * Function getter for $title
     *
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Function setter for $url
     *
     * @param mixed $url
     */
    public function setUrl($url)
    {
        $this->url = $url;
        return $this;
    }

    /**
     * Function getter for $url
     *
     * @return mixed
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Function setter for $text
     *
     * @param mixed $text
     */
    public function setText($text)
    {
        $this->text = $text;
        return $this;
    }

    /**
     * Function getter for $text
     *
     * @return mixed
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Function setter for $description
     *
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
        return $this;
    }

    /**
     * Function getter for $description
     *
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Function setter for $author
     *
     * @param mixed $author
     */
    public function setAuthor($author)
    {
        $this->author = $author;
        return $this;
    }

    /**
     * Function getter for $author
     *
     * @return mixed
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Function setter for $created
     *
     * @param mixed $created
     */
    public function setCreated($created)
    {
        $this->created = $created;
        return $this;
    }

    /**
     * Function getter for $created
     *
     * @return mixed
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Function setter for $published
     *
     * @param mixed $published
     */
    public function setPublished($published)
    {
        $this->published = $published;
        return $this;
    }

    /**
     * Function getter for $published
     *
     * @return mixed
     */
    public function getPublished()
    {
        return $this->published;
    }

    public function __toString(){
        if ($this->getTitle()) {
            return $this->getTitle();
        }
        return '';
    }
}