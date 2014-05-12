<?php

namespace NG\UserBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ODM\MongoDB\Mapping\Annotations\HasLifecycleCallbacks;

/**
 * Class for users
 *
 * @MongoDB\Document(
 *     collection="user",
 *     repositoryClass="NG\UserBundle\Repository\UserRepository",
 *     indexes={
 *         @MongoDB\Index(keys={"_id"="asc", "ng.user"="asc"}, options={"background"="true"}),
 *     },
 *     requireIndexes=false
 * )
 * @HasLifecycleCallbacks()
 */
class User extends BaseUser
{
    const USER_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';
    const USER_ADMIN = 'ROLE_ADMIN';
    const USER_STUDENT = 'ROLE_STUDENT';
    const USER_PROFESSOR = 'ROLE_PROFESSOR';

    const USER_PERMISSION_STUDENT = 1;
    const USER_PERMISSION_PROFESSOR = 2;
    const USER_PERMISSION_ADMIN = 3;

    /**
     * @MongoDB\Id
     */
    protected $id;

    /**
     * @MongoDB\Int(name="permission")
     */
    protected $permission;

    /**
     * @MongoDB\String(name="nmae")
     */
    protected $name;

    /**
     * @MongoDB\String(name="surname")
     */
    protected $surname;

    /**
     * @MongoDB\ReferenceOne(targetDocument="Group", simple=true)
     */
    protected $group;

    /**
     * @MongoDB\ReferenceMany(targetDocument="Group", simple=true)
     */
    protected $studentGroups;

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

    /**
     * Function setter for $studentGroups
     *
     * @param mixed $groups
     */
    public function setStudentGroups($groups)
    {
        $this->studentGroups = $groups;
        return $this;
    }

    /**
     * Function getter for $studentGroups
     *
     * @return mixed
     */
    public function getStudentGroups()
    {
        return $this->studentGroups;
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
     * Function setter for $permission
     *
     * @param mixed $permission
     */
    public function setPermission($permission)
    {
        $this->permission = $permission;
        return $this;
    }

    /**
     * Function getter for $permission
     *
     * @return mixed
     */
    public function getPermission()
    {
        return $this->permission;
    }

    /**
     * Function setter for $surname
     *
     * @param mixed $surname
     */
    public function setSurname($surname)
    {
        $this->surname = $surname;
        return $this;
    }

    /**
     * Function getter for $surname
     *
     * @return mixed
     */
    public function getSurname()
    {
        return $this->surname;
    }
    public function __construct()
    {
        $this->studentGroups = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    /**
     * Add group
     *
     * @param Group $group
     */
    public function addGroups(Group $group)
    {
        $this->studentGroups[] = $group;
    }

    /**
     * Remove group
     *
     * @param Group $group
     */
    public function removeGroups(Group $group)
    {
        $this->studentGroups->removeElement($group);
    }

    public function getFullName() {
        if ($this->getName() && $this->getSurname()) {
            return $this->getName() . ' ' . $this->getSurname();
        } else if ($this->getSurname()) {
            return $this->getSurname();
        } else {
            return $this->getUsername();
        }
    }

    public static function getPermissionsList($keysOnly = true) {
        $list = array(
            static::USER_PERMISSION_STUDENT => 'Студент',
            static::USER_PERMISSION_PROFESSOR => 'Профессор',
            static::USER_PERMISSION_ADMIN => 'Адмін'
        );
        if ($keysOnly) {
            return array_keys($list);
        }
        return $list;
    }
}
