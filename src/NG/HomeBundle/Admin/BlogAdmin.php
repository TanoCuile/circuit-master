<?php

namespace NG\HomeBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;

class BlogAdmin extends Admin {
    protected function configureFormFields(FormMapper $form)
    {
        $persist = $this->getSubject()->getId();
        $form
            ->add('url', 'text', array(
                'disabled' => $persist,
                'label' => 'URL'
            ))
            ->add('title', 'text', array(
                'label' => 'Заголовок'
            ))
            ->add('description', 'textarea', array(
                'label' => 'Короткий опис'
            ))
            ->add('text', 'ckeditor', array(
                'label' => 'Текст',
                'required' => false
            ))
            ->add('author', null, array(
                'label' => 'Автор'
            ))
            ->add('created', 'date', array(
                'label' => 'Створено'
            ))
            ->add('published', null, array(
                'label' => 'Опубліковавно'
            ))
            ;
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->add('title', 'text', array(
                'label' => 'Заголовок'
            ))
            ->add('created', 'date', array(
                'label' => 'Створено'
            ))
            ->add('author', null, array(
                'label' => 'Автор'
            ))
            ->add('_action', 'actions', array(
                'label' => 'Дії',
                'actions' => array(
                    'edit' => array(),
                    'delete' => array()
                )
            ));
    }

}