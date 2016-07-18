<?php

namespace Mte\SmallPurchaseProcedure;

use MteBase\Module\AbstractModule;
use Zend\Console\Adapter\AdapterInterface;
use Zend\ModuleManager\Feature\ConsoleUsageProviderInterface;
use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;
use Doctrine\DBAL\Types\Type;
use Application\Mvc\Handler\Exception;

/**
 * Class Module
 * @package Mte\SmallPurchaseProcedure
 */
class Module extends AbstractModule implements
    ConsoleUsageProviderInterface
{
    /**
     * @param MvcEvent $e
     * @throws \Doctrine\DBAL\DBALException
     */
    public function onBootstrap(MvcEvent $e)
    {
        $eventManager = $e->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);

        Type::overrideType('datetime', 'Doctrine\DBAL\Types\VarDateTimeType');
        Type::overrideType('datetimetz', 'Doctrine\DBAL\Types\VarDateTimeType');
        Type::overrideType('time', 'Doctrine\DBAL\Types\VarDateTimeType');

        //подписываемся на получение правильного бакурла в гридах
        $eventManager->attachAggregate($e->getApplication()->getServiceManager()->get('GridBackUrlEventListener'));
        //подписываемся на обработку эксепшенов
        $errorHandler = new Exception;
        $eventManager->attach(MvcEvent::EVENT_DISPATCH_ERROR, [$errorHandler, 'handle'], -999);
    }


    /**
     * Returns configuration to merge with application configuration
     *
     * @return array|\Traversable
     */
    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    /**
     * @return array
     */
    public function getAutoloaderConfig()
    {
        $config = [];
        $autoloadFile = __DIR__ . '/autoload_classmap.php';
        if (file_exists($autoloadFile)) {
            $config['Zend\Loader\ClassMapAutoloader'] = [
                $autoloadFile
            ];
        }
        $config['Zend\Loader\StandardAutoloader'] = [
            'namespaces' => [
                __NAMESPACE__ => __DIR__ . '/src',
            ],
        ];
        return $config;
    }

    /**
     * Returns an array or a string containing usage information for this module's Console commands.
     * The method is called with active Zend\Console\Adapter\AdapterInterface that can be used to directly access
     * Console and send output.
     *
     * If the result is a string it will be shown directly in the console window.
     * If the result is an array, its contents will be formatted to console window width. The array must
     * have the following format:
     *
     *     return array(
     *                'Usage information line that should be shown as-is',
     *                'Another line of usage info',
     *
     *                '--parameter'        =>   'A short description of that parameter',
     *                '-another-parameter' =>   'A short description of another parameter',
     *                ...
     *            )
     *
     * @param AdapterInterface $console
     * @return array|string|null
     */
    public function getConsoleUsage(AdapterInterface $console)
    {
        return [];
    }
}
