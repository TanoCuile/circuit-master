<?php

namespace NG\HomeBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;

class PageAdmin extends Admin {
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
            ->add('text', 'ckeditor', array(
                'label' => 'Текст',
                'required' => false
            ))
            ->add('isMenuItem', 'checkbox', array(
                'label' => 'Являється пунктом меню',
                'required' => false
            ))
            ->add('parent', null, array(
                'label' => 'Батьківський пункт',
                'required' => false
            ))
            ->add('weight', null, array(
                'label' => 'Вага(визначає місце в меню)'
            ))
            ;
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->add('title', 'text', array(
                'label' => 'Заголовок'
            ))
            ->add('isMenuItem', null, array(
                'label' => 'Являється пунктом меню'
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