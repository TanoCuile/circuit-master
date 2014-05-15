<?php

namespace NG\CircuitBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;

class ComponentGroupAdmin extends Admin {
    protected function configureFormFields(FormMapper $form)
    {
        $form->add('name', null, array(
            'label' => 'Назва'
        ));
    }

    protected function configureListFields(ListMapper $list)
    {
        $list->add('name', null, array(
            'label' => 'Назва'
        ))
        ->add('_action', 'actions', array(
                'label' => 'Дії',
                'actions' => array(
                    'edit' => array(),
                    'delete' => array(),
                )
            ));
    }
}