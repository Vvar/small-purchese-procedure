<?php
/**
 * @company MTE Telecom, Ltd.
 * @author Maxim Tyuftin <maxim.t@mte-telecom.ru>
 */

namespace Vvar\SmallPurchaseProcedure\View\Helper;

use MteBase\View\Helper\ServiceManagerAwareTrait;
use MteOrganization\Entity\User;
use Rbac\Entity\Role;
use Zend\View\Helper\AbstractHtmlElement;

/**
 * Class UserToolbar
 * @package Vvar\SmallPurchaseProcedure\View\Helper
 */
class UserToolbar extends AbstractHtmlElement
{
    use ServiceManagerAwareTrait;

    /**
     * @return string
     */
    public function __invoke()
    {
//        /** @var \Organization\Entity\User $user */
//        $user = $this->getServiceManager()->get('mteActiveUser');
//
//        if($user->isGuest()) {
//            return null;
//        }
//        $array = array();
//        if($user->hasRole(Role::ROLE_SUPPLIER)) {
//            $array = array_merge($array, $this->supplierInfo($user));
//            #$array = array_merge($array, $this->unreadMessagesInfo($user));
//        }
//
//        if($user->hasRole(Role::ROLE_CUSTOMER)) {
//            #$array = array_merge($array, $this->unreadMessagesInfo($user));
//            $array = array_merge($array, $this->requestExplanationDocs($user));
//            $array = array_merge($array, $this->requestExplanationResults($user));
//        }
//
//        if ( $this->getServiceManager()->has('mteProcedureOptions') ) {
//            $moduleOptions = $this->getServiceManager()->get('mteProcedureOptions');
//            $organizationsForContractViolationView = $moduleOptions->getOrganizationsForContractViolationView();
//
//            if (
//                $organizationsForContractViolationView &&
//                $user->getCurrentOrganization()->getId() &&
//                in_array($user->getCurrentOrganization()->getId(), $organizationsForContractViolationView)
//            ) {
//                // Организации для которых включаем истекщие контракты
//                $array = array_merge($array, $this->requestSigningPeriodViolationContracts($user));
//            }
//        }
//
//        if($user->hasRole(Role::ROLE_OPERATOR)) {
//            $array = array_merge($array, $this->requestExplanationResults($user));
//        }
//        if($user->hasRole(Role::ROLE_BANK)) {
//            #$array = array_merge($array, $this->unreadMessagesInfo($user));
//        }
//        return $this->getView()->mteBreadcrumb($array);
    }

    /**
     * Информация для УРЗ
     * @param \MteOrganization\Entity\User $user
     *
     * @return array
     */
    private function supplierInfo($user)
    {
//        /** @var \MtePayment\Service\Adapter\AdapterFactory $adapterFactory */
//        $adapterFactory = $this->getServiceManager()->get('MtePaymentAdapterFactoryService');
//        $adapter = $adapterFactory->createByRelationData(array('entity' => 'organization', 'entityId' => $user->getCurrentOrganization()->getId()));
//
//        $free = $adapter->getFreeAccount();
//        $htmlFree = '<span id="supplierMoney">Свободных средств: <strong>'
//            . (!empty($free) ?number_format($free->getAmount(), 2, '.', ' ') : '0.00')
//            . ' р.</strong></span>';
//
//        $block = $adapter->getBlockAccount();
//        $htmlBlock = ' <span id="supplierMoneyBlocked">Блокированных средств: <strong>'
//            . (!empty($block) ? number_format($block->getAmount(), 2, '.', ' ') : '0.00')
//            . ' р.</strong></span>';
//        return array(
//            array(
//                'title' => $htmlFree,
//            ),
//            array(
//                'title' => $htmlBlock,
//            ),
//        );
    }

    /**
     * Информация о непрочитанных сообщениях пользователя
     * @param \MteOrganization\Entity\User $user
     * @return array
     */
    private function unreadMessagesInfo($user)
    {
//        /** @var \Organization\Service\MemberService $memberService */
//        $memberService = $this->getServiceManager()->get('mteMemberService');
//        $unreadMessages = $memberService->getCountUnreadMessages($user->getCurrentMember());
//
//        return array(
//            array(
//                'title' => 'Непрочитанные сообщения',
//                'badge' => $unreadMessages['memberMessages'],
//                'url' => $this->getView()->url('organization/message/list'),
//            ),
//        );
    }

    /**
     * Запросы о разъяснении результатов
     * @param \MteOrganization\Entity\User $user
     * @return array
     */
    private function requestExplanationResults($user)
    {
//        /** @var \MteProcedure\Mapper\ExplanationRequestMapper $mapperExp */
//        $mapperExp = $this->getServiceManager()->get('mteProcedureMapper_ExplanationRequest');
//        $count = $mapperExp->getCountExplanationRequestByOrganization(
//            $user->getCurrentOrganization(),
//            Explanation::TYPE_EXPLAIN_RESULT_PROCEDURE
//        );
//
//        return array(
//            array(
//                'title' => 'Запросы о даче разъяснений результатов закупки',
//                'badge' => $count,
//                'url' => $this->getView()->url('mteProcedure/catalog/explanationRequestCatalog', array('type' => 'result')),
//            ),
//        );
    }
    /**
     *
     * Запросы о даче разъяснений документации
     * @param \MteOrganization\Entity\User $user
     * @return array
     */
    private function requestExplanationDocs($user)
    {
//        /** @var \MteProcedure\Mapper\ExplanationRequestMapper $mapperExp */
//        $mapperExp = $this->getServiceManager()->get('mteProcedureMapper_ExplanationRequest');
//        $count = $mapperExp->getCountExplanationRequestByOrganization(
//            $user->getCurrentOrganization(),
//            Explanation::TYPE_EXPLAIN_DOK_PROCEDURE
//        );
//
//        return array(
//            array(
//                'title' => 'Запросы о даче разъяснений положений документации',
//                'badge' => $count,
//                'url' => $this->getView()->url('mteProcedure/catalog/explanationRequestCatalog', array('type' => 'documentation')),
//            ),
//        );
    }
    /**
     *
     * Контракты с нарушеным сроком подписания
     * @param \MteOrganization\Entity\User $user
     * @return array
     */
    private function requestSigningPeriodViolationContracts(User $user)
    {
//        /** @var \MteProcedure\Mapper\ExplanationRequestMapper $mapperExp */
//        $contractMapper = $this->getServiceManager()->get('mteProcedureMapper_Contract');
//
//        $count = $contractMapper->getSigningPeriodViolationContractsCount(
//            $user->getCurrentOrganization()
//        );
//
//        return array(
//            array(
//                'title' => 'Нарушение срока подписания контракта',
//                'badge' => $count,
//                'url' => $this->getView()->url('mteProcedure/catalog/contractCatalog',[
//                    'tab' => 'signing-period-violation'
//                ]),
//            ),
//        );
    }
}