<?php

namespace Vvar\SmallPurchaseProcedure\View\Helper;

use Zend\View\Helper\AbstractHtmlElement;

/**
 * Class ActiveUser
 * @package Vvar\SmallPurchaseProcedure\View\Helper
 */
class ActiveUser extends AbstractHtmlElement
{
    /**
     * @return \Organization\Entity\User
     */
    public function __invoke()
    {
        $user = $this->getView()
            ->getHelperPluginManager()
            ->getServiceLocator()
            ->get('mteActiveUser');

        return $user;
    }
}
