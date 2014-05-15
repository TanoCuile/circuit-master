<?php

namespace NG\CircuitBundle\Admin;

use NG\CircuitBundle\Document\ComponentType;
use NG\CircuitBundle\Document\HelpImage;
use NG\CircuitBundle\Form\Type\HelpImageType;
use NG\CircuitBundle\Form\Type\PinType;
use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;

class ComponentTypeAdmin extends Admin {
    protected $defaultImage = '';
    protected $previewImage = '';

    protected $defaultHelpImages = array();
    protected function configureFormFields(FormMapper $form)
    {
        /** @var ComponentType $object */
        $object = $this->getSubject();
        $persistAction = !$object->getId();
        if (!$persistAction) {
            $this->defaultImage = $object->getImage();
            $this->previewImage = $object->getPreview();
            foreach ($object->getHelpImages() as $image){
                /** @var $image HelpImage */
                $this->defaultHelpImages[$image->getId()] = $image->getPath();
            }
        }
        $form
            ->add('name', null, array(
                'label' => 'Назва',
            ))
            ->add('machineName', null, array(
                'label' => 'Системна назва',
                'disabled' => !$persistAction,
            ))
            ->add('image', 'image', array(
                'label' => 'Зображення на схемі',
                'data_class' => null,
                'required' => $persistAction,
                'property_path' => 'webPath',
                'preview_width' => 0,
                'preview_class' => 'component-main-preview'
            ))
            ->add('preview', 'image', array(
                'label' => 'Фото',
                'data_class' => null,
                'required' => false,
                'property_path' => 'previewWebPath',
            ))
            ->add('group', null, array(
                'label' => 'Група',
                'required' => true
            ))
            ->add('area', 'choice', array(
                'label' => 'Природа',
                'required' => true,
                'choices' => ComponentType::getAreaLabels()
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
                'attr' => array(
                    'class' => 'pin_collection'
                ),
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
                    'label' => '-',
                )
            ))
        ;
    }

    protected function configureListFields(ListMapper $list)
    {
        $list
            ->add('name', null, array(
                'label' => 'Назва',
            ))
            ->add('machineName', null, array(
                'label' => 'Системна назва'
            ))
            ->add('_action', 'actions', array(
                'label' => 'Дії',
                'actions' => array(
                    'edit' => array(),
                    'delete' => array()
                )
            ))
        ;
    }

    /**
     * @param ComponentType $object
     * @return mixed|void
     */
    public function preUpdate($object)
    {
        $img = $object->getImage();
        if ($this->defaultImage && empty($img)) {
            $object->setImage($this->defaultImage);
        }
        $img = $object->getPreview();
        if ($this->previewImage && empty($img)) {
            $object->setPreview($this->previewImage);
        }
        foreach ($object->getHelpImages() as $image) {
            /** @var HelpImage $image */
            $path = $image->getPath();
            if (empty($path) && isset($this->defaultHelpImages[$image->getId()])) {
                $image->setPath($this->defaultHelpImages[$image->getId()]);
            }
        }
    }

    public function prePersist($object)
    {

    }


}
