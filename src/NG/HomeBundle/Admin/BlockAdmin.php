<?php

namespace NG\HomeBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;

class BlockAdmin extends Admin {
    protected function configureFormFields(FormMapper $form)
    {
        $persist = $this->getSubject()->getId();
        $form
            ->add('machineName', 'text', array(
                'disabled' => $persist,
                'label' => 'Системна назва'
            ))
            ->add('name', 'text', array(
                'label' => 'Назва'
            ))
            ->add('text', 'ckeditor', array(
                'label' => 'Текст',
                'required' => false
            ))
            ;
    }

    protected function configureListFields(ListMapper $list)
    {
        $list->add('name', 'text', array(
                'label' => 'Назва'
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