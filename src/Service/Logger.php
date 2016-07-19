<?php
namespace Vvar\SmallPurchaseProcedure\Service;

use MteLog\Service\Logger as MteLogger;

/**
 * Class Logger
 */
class Logger extends MteLogger
{
    /**
     * Push HTTP request and response to log
     *
     * @param \Zend\Http\Request $request
     * @param \Zend\Http\Response $response
     * @return bool
     */
    public function logHttpAction(\Zend\Http\Request $request, \Zend\Http\Response $response)
    {
        $request = clone $request;
        $request->getUri()->setPath('/electronicshop'.$request->getUri()->getPath());

        return parent::logHttpAction($request,$response);
    }
}