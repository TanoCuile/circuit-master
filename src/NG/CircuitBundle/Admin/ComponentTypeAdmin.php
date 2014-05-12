<?php

namespace NG\CircuitBundle\Admin;

use NG\CircuitBundle\Form\Type\HelpImageType;
use NG\CircuitBundle\Form\Type\PinType;
use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;

class ComponentTypeAdmin extends Admin {
    protected function configureFormFields(FormMapper $form)
    {
        $form
            ->add('name', null, array(
                'label' => '',
            ))
            ->add('machineName', null, array(
                'label' => ''
            ))
            ->add('image', 'image', array(
                'label' => ''
            ))
            ->add('pinCollection', 'collection', array(
                'label' => '',
                'type' => new PinType(),
                'allow_add' => true,
                'allow_delete' => true, // should render default button, change text with widget_remove_btn
                'prototype' => true,
                'widget_add_btn' => array('label' => "add email"),
                'show_legend' => false, // dont show another legend of subform
                'widget_checkbox_label' => 'widget',
                'options' => array(
                    'label' => '-'
                )
            ))
            ->add('helpImages', 'collection', array(
                'label' => '',
                'type' => new HelpImageType(),
                'allow_add' => true,
                'allow_delete' => true, // should render default button, change text with widget_remove_btn
                'prototype' => true,
                'widget_add_btn' => array('label' => "add email"),
                'show_legend' => false, // dont show another legend of subform
                'widget_checkbox_label' => 'widget',
                'options' => array(
                    'label' => '-'
                )
            ))
        ;
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->add('name', null, array(
                'label' => '',
            ))
            ->add('machineName', null, array(
                'label' => ''
            ))
            ->add('_actions', 'action', array(
                'label' => '',
                'actions' => array(
                    'edit' => array(),
                    'delete' => array()
                )
            ))
        ;
    }
}