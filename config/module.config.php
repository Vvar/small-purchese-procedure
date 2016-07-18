<?php

return [
    'doctrine' => [
        'driver' => [
            'ApplicationBaseDriver' => [
                'class' => 'Doctrine\ORM\Mapping\Driver\PHPDriver',
                'paths' => __DIR__ . '/doctrine/mte-base',
            ],
            'orm_default' => [
                'drivers' => [
                    'MteBase\Entity' => 'ApplicationBaseDriver',
                ],
            ],
        ],
    ],
    'router' => [
        'router_class' => 'Application\Mvc\Router\Router\Router',
        'routes' => [
            'testEventBus' => [
                'type' => 'Literal',
                'options' => [
                    'route' => '/testEventBus',
                    'defaults'=> [
                        'controller' => 'Application\Controller\TestEventBusController',
                        'action' => 'index'
                    ],
                ],
            ],
        ],
    ],
    'service_manager' => array(
        'abstract_factories' => array(
            'Zend\Cache\Service\StorageCacheAbstractServiceFactory',
            'Zend\Log\LoggerAbstractServiceFactory',
        ),
        'factories' => array(
            'translator' => 'Zend\Mvc\Service\TranslatorServiceFactory',
        ),
        'invokables' => [
            'GridBackUrlEventListener' => \Application\Listener\GridBackUrlEvent::class,

            // Service
            'mteLogService' => 'Application\Service\Logger',
        ]
    ),
    'translator' => array(
        'locale' => 'ru_RU',
        'translation_file_patterns' => array(
            array(
                'type'     => 'gettext',
                'base_dir' => __DIR__ . '/../language',
                'pattern'  => '%s.mo',
            ),
            array(
                'type' => 'phparray',
                'base_dir' => __DIR__ . '/../../../config/language',
                'pattern' => '%s.php',
            ),
        ),
    ),
    'controllers' => [
        'invokables' => [
            'Application\Controller\Index' => 'Application\Controller\IndexController'
        ],
    ],
    'view_manager' => [
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        //'base_path'                 => '/electronicshop',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => [
            'application/index/index' => __DIR__ . '/../view/application/index/index.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
            'layout/layout'           => __DIR__ . '/../view/application/layout/layout.phtml',
        ],
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],
    // Placeholder for console routes
    'console' => array(
        'router' => array(
            'routes' => array(
            ),
        ),
    ),
    'view_helpers' => array(
        'invokables' => array(
            'userToolbar' => 'Application\View\Helper\UserToolbar',
            'activeUser' => 'Application\View\Helper\ActiveUser',
        )
    ),
];
