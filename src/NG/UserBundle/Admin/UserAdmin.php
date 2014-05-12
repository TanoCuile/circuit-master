<?php

namespace NG\UserBundle\Admin;

use NG\UserBundle\Document\User;
use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;

class UserAdmin extends Admin{
    protected function configureFormFields(FormMapper $form)
    {
        /** @var User $object */
        $object = $this->getSubject();
        $form
            ->add('username', null, array(
                'label' => 'Логін'
            ))
            ->add('email', null, array(
                'label' => 'Email',
            ))
            ->add('plainPassword', 'password', array(
                'label' => 'Новий пароль',
                'required' => false
            ))
            ->add('name', null, array(
                'label' => "Ім'я",
                'required' => false
            ))
            ->add('surname', null, array(
                'label' => 'Прізвище',
                'required' => false
            ))
            ->add('permission', 'choice', array(
                'label' => 'Роль',
                'choices' => User::getPermissionsList(false)
            ))
            ->add('enabled', null, array(
                'label' => 'Активований',
                'required' => false
            ))
            ->add('locked', null, array(
                'label' => 'Заблокований',
                'required' => false
            ));
        if ($object->getId()) {
            switch($object->getPermission()){
                case User::USER_PERMISSION_STUDENT:
                    $form->add('group', null, array(
                        'label' => 'Група'
                    ));
                    break;
                case User::USER_PERMISSION_PROFESSOR:
                    $form->add('studentGroups', null, array(
                        'label' => 'Групи',
                        'multiple' => true
                    ));
                    break;
            }
        }
    }

    protected function configureDatagridFilters(DatagridMapper $filter)
    {
        $filter
            ->add('username', null, array(
                'label' => 'Логін'
            ))
            ->add('surname', null, array(
                'label' => 'Прізвище'
            ))
            ->add('permission', 'doctrine_mongo_choice', array(
                'field_type' => 'choice',
                'label' => 'Роль',
                'field_options' => array('choices' => User::getPermissionsList(false))
            ));
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->add('name', null, array(
                'label' => "Ім'я",
                'required' => false
            ))
            ->add('surname', null, array(
                'label' => 'Прізвище',
                'required' => false
            ))
            ->add('username', null, array(
                'label' => 'Логін'
            ))
            ->add('_action', 'actions', array(
                'label' => 'Дії',
                'actions' => array(
                    'edit' => array(),
                    'delete' => array()
                )
            ));
    }

    /**
     * @param User $object
     * @return mixed|void
     */
    public function preUpdate($object)
    {
        $this->preparePassword($object);
        $this->prepareRoles($object);
    }

    public function prePersist($object)
    {
        $this->preparePassword($object);
        $this->prepareRoles($object);
    }
    /**
     * @param User $object
     */
    public function preparePassword($object)
    {
        if ($object->getPlainPassword()) {
            $userManager = $this->getConfigurationPool()->getContainer()->get('fos_user.user_manager');
            $userManager->updatePassword($object);
        }
    }


    /**
     * @param User $object
     */
    public function prepareRoles($object)
    {
        if ($object->getPermission() == User::USER_PERMISSION_STUDENT) {
            $object->addRole(User::USER_STUDENT);
        } else if ($object->hasRole(User::USER_STUDENT)) {
            $object->removeRole(User::USER_STUDENT);
        }
        if ($object->getPermission() == User::USER_PERMISSION_PROFESSOR) {
            $object->addRole(User::USER_PROFESSOR);
        } else if ($object->hasRole(User::USER_PROFESSOR)) {
            $object->removeRole(User::USER_PROFESSOR);
        }
        if ($object->getPermission() == User::USER_PERMISSION_ADMIN) {
            $object->addRole(User::USER_ADMIN);
        } else if ($object->hasRole(User::USER_ADMIN)) {
            $object->removeRole(User::USER_ADMIN);
        }
    }
}