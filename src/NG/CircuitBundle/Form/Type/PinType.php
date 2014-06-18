<?php

namespace NG\CircuitBundle\Form\Type;

use NG\CircuitBundle\Document\Pin;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class PinType extends AbstractType {
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('machineName', null, array(
                'label' => 'Машинна назва',
            ))
            ->add('x', null, array(
                'attr' => array(
                    'class' => 'x-axis'
                )
            ))
            ->add('y', null, array(
                'attr' => array(
                    'class' => 'y-axis'
                )
            ))
            ->add('orientation', 'choice', array(
                'label' => '',
                'choices' => Pin::getOrientationList(false)
            ))
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'NG\CircuitBundle\Document\Pin'
        ));
    }


    /**
     * Returns the name of this type.
     *
     * @return string The name of this type
     */
    public function getName()
    {
        return 'pin_type';
    }
}