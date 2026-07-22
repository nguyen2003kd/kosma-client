const basePaths = {
  // Auth
  auth: {
    path: "auth",
    // Sign in
    signIn: {
      path: "/auth/sign-in",
    },
  },
  // Main
  main: {
    path: "/",
    // Profile
    profile: {
      path: "/profile",
    },
    // System
    system: {
      path: "/system",
      // User list
      userList: {
        path: "/system/user-list",
      },
      // User form
      userForm: {
        path: "/system/user-form", // Search params: userId
      },
      // User detail
      userDetail: {
        path: "/system/user-detail/{userId}",
      },
      // Activity history list
      activityHistoryList: {
        path: "/system/activity-history-list",
      },
      // Backup
      backup: {
        path: "/system/backup",
      },
    },
    // Customer
    customer: {
      path: "/customer",
      // Customer form
      customerForm: {
        path: "/customer/customer-form", // Search params: customerId, isRejected (true/false)
      },
      // Customer contract form
      customerContractForm: {
        path: "/customer/{customerId}/customer-contract-form", // Search params: customerContractId
      },
      // Customer personnel form
      customerPersonnelForm: {
        path: "/customer/{customerId}/customer-personnel-form", // Search params: customerPersonnelId
      },
      // Customer handler employee list update
      customerHandlerEmployeeListUpdate: {
        path: "/customer/{customerId}/customer-handler-employee-list-update", // Search params: isAfterApproval
      },
      // Customer personnel dependent form
      customerPersonnelDependentForm: {
        path: "/customer/{customerId}/{customerPersonnelId}/customer-personnel-dependent-form", // Search params: customerPersonnelDependentId
      },
      // Customer personnel salary history form
      customerPersonnelSalaryHistoryForm: {
        path: "/customer/{customerId}/{customerPersonnelId}/customer-personnel-salary-history-form", // Search params: customerPersonnelSalaryHistoryId, isUpdateMode
      },
      // Customer personnel allowance form
      customerPersonnelAllowanceForm: {
        path: "/customer/{customerId}/{customerPersonnelId}/customer-personnel-allowance-form", // Search params: customerPersonnelAllowanceId, isUpdateMode
      },
      // Customer list
      customerList: {
        path: "/customer/customer-list",
        // All customer list
        allCustomerList: {
          path: "/customer/customer-list/all-customer-list",
        },
        // Approved customer list
        approvedCustomerList: {
          path: "/customer/customer-list/approved-customer-list",
        },
        // Rejected customer list
        rejectedCustomerList: {
          path: "/customer/customer-list/rejected-customer-list",
        },
        // Service discontinued customer list
        serviceDiscontinuedCustomerList: {
          path: "/customer/customer-list/service-discontinued-customer-list",
        },
      },
      // Customer detail
      customerDetail: {
        path: "/customer/customer-detail/{customerId}",
        // Customer information
        customerInformation: {
          path: "/customer/customer-detail/{customerId}/customer-information",
        },
        // Personnel list
        personnelList: {
          path: "/customer/customer-detail/{customerId}/personnel-list",
        },
        // Contract list
        contractList: {
          path: "/customer/customer-detail/{customerId}/contract-list",
        },
        // Customer change history
        customerChangeHistory: {
          path: "/customer/customer-detail/{customerId}/customer-change-history",
        },
        // Handler employee list
        handlerEmployeeList: {
          path: "/customer/customer-detail/{customerId}/handler-employee-list",
        },
      },
      // Customer contract detail
      customerContractDetail: {
        path: "/customer/{customerId}/customer-contract-detail/{customerContractId}",
        //  Contract information
        contractInformation: {
          path: "/customer/{customerId}/customer-contract-detail/{customerContractId}/contract-information",
        },
        // Contract change history
        contractChangeHistory: {
          path: "/customer/{customerId}/customer-contract-detail/{customerContractId}/contract-change-history",
        },
      },
      // Customer personnel detail
      customerPersonnelDetail: {
        path: "/customer/{customerId}/customer-personnel-detail/{customerPersonnelId}",
        // Personnel information
        personnelInformation: {
          path: "/customer/{customerId}/customer-personnel-detail/{customerPersonnelId}/personnel-information",
        },
        // Dependent list
        dependentList: {
          path: "/customer/{customerId}/customer-personnel-detail/{customerPersonnelId}/dependent-list",
        },
        // Salary history list
        salaryHistoryList: {
          path: "/customer/{customerId}/customer-personnel-detail/{customerPersonnelId}/salary-history-list",
        },
        // Allowance list
        allowanceList: {
          path: "/customer/{customerId}/customer-personnel-detail/{customerPersonnelId}/allowance-list",
        },
        // Personnel change history
        personnelChangeHistory: {
          path: "/customer/{customerId}/customer-personnel-detail/{customerPersonnelId}/personnel-change-history",
        },
      },
      // Customer personnel dependent detail
      customerPersonnelDependentDetail: {
        path: "/customer/{customerId}/{customerPersonnelId}/customer-personnel-dependent-detail/{customerPersonnelDependentId}",
        // Dependent information
        dependentInformation: {
          path: "/customer/{customerId}/{customerPersonnelId}/customer-personnel-dependent-detail/{customerPersonnelDependentId}/dependent-information",
        },
        // Dependent change history
        dependentChangeHistory: {
          path: "/customer/{customerId}/{customerPersonnelId}/customer-personnel-dependent-detail/{customerPersonnelDependentId}/dependent-change-history",
        },
      },
    },
    // Clerical
    clerical: {
      path: "/clerical",
      // Clerical creation form
      clericalCreationForm: {
        path: "/clerical/clerical-creation-form", // Search params: clericalType (ClericalType)
      },
      // Clerical update form
      clericalUpdateForm: {
        path: "/clerical/clerical-update-form/{clericalId}", // Search params: clericalType (ClericalType)
      },
      // Clerical approval form
      clericalApprovalForm: {
        path: "/clerical/clerical-approval-form/{clericalId}",
      },
      // Clerical list
      clericalList: {
        path: "/clerical/clerical-list",
        // Incoming clerical list
        incomingClericalList: {
          path: "/clerical/clerical-list/incoming-clerical-list",
        },
        // Internal clerical list
        internalClericalList: {
          path: "/clerical/clerical-list/internal-clerical-list",
        },
        // Outgoing clerical list
        outgoingClericalList: {
          path: "/clerical/clerical-list/outgoing-clerical-list",
        },
        // Pending clerical list
        pendingClericalList: {
          path: "/clerical/clerical-list/pending-clerical-list",
        },
        // Rejected clerical list
        rejectedClericalList: {
          path: "/clerical/clerical-list/rejected-clerical-list",
        },
        // Clerical statistic
        clericalStatistic: {
          path: "/clerical/clerical-list/clerical-statistic",
        },
      },
      // Clerical detail
      clericalDetail: {
        path: "/clerical/clerical-detail/{clericalId}",
        // Clerical information
        clericalInformation: {
          path: "/clerical/clerical-detail/{clericalId}/clerical-information",
        },
        // Clerical change history
        clericalChangeHistory: {
          path: "/clerical/clerical-detail/{clericalId}/clerical-change-history",
        },
      },
    },
    // Business
    business: {
      path: "/business",
      // Customer list
      customerList: {
        path: "/business/customer-list",
      },
      // Customer formula list
      customerFormulaList: {
        path: "/business/{customerId}/customer-formula-list",
      },
      // Customer formula form
      customerFormulaForm: {
        path: "/business/{customerId}/customer-formula-form", // Search params: formulaId, r
      },
      // Customer data export template form
      customerDataExportTemplateForm: {
        path: "/business/{customerId}/customer-data-export-template-form", // Search params: r
      },
      // Default column formula list
      defaultColumnFormulaList: {
        path: "/business/default-column-formula-list",
      },
      // Default column formula form
      defaultColumnFormulaForm: {
        path: "/business/default-column-formula-form/{columnCode}",
      },
      // Personnel list
      personnelList: {
        path: "/business/{customerId}/personnel-list",
      },
      // Payroll list
      payrollList: {
        path: "/business/{customerId}/payroll-list",
      },
      // Data lookup
      dataLookup: {
        path: "/business/data-lookup",
      },
      // Foreign taxable personnel list
      foreignTaxablePersonnelList: {
        path: "/business/foreign-taxable-personnel-list",
      },
      // Foreign tax table
      foreignTaxTable: {
        path: "/business/{customerId}/{customerPersonnelId}/foreign-tax-table",
      },
      // Net to gross conversion
      netToGrossConversion: {
        path: "/business/net-to-gross-conversion",
      },
      // Replacement notice creation
      replacementNoticeCreation: {
        path: "/business/replacement-notice-creation/{customerId}/{noticeId}", // Search params: period, customerCode
      },
      // Exchange rate
      exchangeRate: {
        path: "/business/exchange-rate",
        exchangeRateConversion: {
          path: "/business/exchange-rate/exchange-rate-conversion",
        },
        exchangeRateChangeHistory: {
          path: "/business/exchange-rate/exchange-rate-change-history",
        },
      },
      // Ceiling level
      ceilingLevel: {
        path: "/business/ceiling-level",
        ceilingLevelList: {
          path: "/business/ceiling-level/ceiling-level-list",
        },
        ceilingLevelChangeHistory: {
          path: "/business/ceiling-level/ceiling-level-change-history",
        },
      },
      // Notice list
      noticeList: {
        path: "/business/notice-list",
        // Pending notice list
        pendingNoticeList: {
          path: "/business/notice-list/pending-notice-list", // Search params: customerCode
        },
        // Approved notice list
        approvedNoticeList: {
          path: "/business/notice-list/approved-notice-list",
        },
        // Rejected notice list
        rejectedNoticeList: {
          path: "/business/notice-list/rejected-notice-list",
        },
        // Cancelled notice list
        cancelledNoticeList: {
          path: "/business/notice-list/cancelled-notice-list",
        },
      },
      // Payroll unlocking request list
      payrollUnlockingRequestList: {
        path: "/business/payroll-unlocking-request-list",
        // Pending payroll unlocking request list
        pendingPayrollUnlockingRequestList: {
          path: "/business/payroll-unlocking-request-list/pending-payroll-unlocking-request-list",
        },
        // Approved payroll unlocking request list
        approvedPayrollUnlockingRequestList: {
          path: "/business/payroll-unlocking-request-list/approved-payroll-unlocking-request-list",
        },
        // Rejected payroll unlocking request list
        rejectedPayrollUnlockingRequestList: {
          path: "/business/payroll-unlocking-request-list/rejected-payroll-unlocking-request-list",
        },
      },
      // Payroll formula editing request list
      payrollFormulaEditingRequestList: {
        path: "/business/payroll-formula-editing-request-list",
        // Pending payroll formula editing request list
        pendingPayrollFormulaEditingRequestList: {
          path: "/business/payroll-formula-editing-request-list/pending-payroll-formula-editing-request-list",
        },
        // Approved payroll formula editing request list
        approvedPayrollFormulaEditingRequestList: {
          path: "/business/payroll-formula-editing-request-list/approved-payroll-formula-editing-request-list",
        },
        // Rejected payroll formula editing request list
        rejectedPayrollFormulaEditingRequestList: {
          path: "/business/payroll-formula-editing-request-list/rejected-payroll-formula-editing-request-list",
        },
      },
    },
    // Warehouse
    warehouse: {
      path: "/warehouse",
      // Warehouse diagram
      warehouseDiagram: {
        path: "/warehouse/warehouse-diagram",
      },
      // Request list
      requestList: {
        path: "/warehouse/request-list",
      },
      // Insertion request form
      insertionRequestForm: {
        path: "/warehouse/insertion-request-form", // Search params: requestId
      },
      // Borrowing request form
      borrowingRequestForm: {
        path: "/warehouse/borrowing-request-form", // Search params: requestId
      },
      // Return request form
      returnRequestForm: {
        path: "/warehouse/return-request-form", // Search params: requestId, borrowRequestId, rawRecords
      },
      // Cancellation request form
      cancellationRequestForm: {
        path: "/warehouse/cancellation-request-form", // Search params: requestId
      },
      // Record update request form
      recordUpdateRequestForm: {
        path: "/warehouse/record-update-request-form", // Search params: requestId, recordId
      },
      // Warehouse diagram update request form
      warehouseDiagramUpdateRequestForm: {
        path: "/warehouse/warehouse-diagram-update-request-form", // Search params: requestId
      },
      // Asset form
      assetForm: {
        path: "/warehouse/asset-form", // Search params: assetId
      },
      // Asset request update form
      assetRequestUpdateForm: {
        path: "/warehouse/asset-request-update-form/{requestId}/{requestAction}",
      },
      // Insertion request detail
      insertionRequestDetail: {
        path: "/warehouse/insertion-request-detail/{requestId}",
      },
      // Borrowing request detail
      borrowingRequestDetail: {
        path: "/warehouse/borrowing-request-detail/{requestId}",
      },
      // Return request detail
      returnRequestDetail: {
        path: "/warehouse/return-request-detail/{requestId}",
      },
      // Cancellation request detail
      cancellationRequestDetail: {
        path: "/warehouse/cancellation-request-detail/{requestId}",
      },
      // Record update request detail
      recordUpdateRequestDetail: {
        path: "/warehouse/record-update-request-detail/{requestId}",
      },
      // Warehouse diagram update request detail
      warehouseDiagramUpdateRequestDetail: {
        path: "/warehouse/warehouse-diagram-update-request-detail/{requestId}",
      },
      // Asset request detail
      assetRequestDetail: {
        path: "/warehouse/asset-request-detail/{requestId}",
      },
      // Record detail
      recordDetail: {
        path: "/warehouse/record-detail/{recordId}",
        // Record information
        recordInformation: {
          path: "/warehouse/record-detail/{recordId}/record-information",
        },
        // Record change history
        recordChangeHistory: {
          path: "/warehouse/record-detail/{recordId}/record-change-history",
        },
        // Record borrowing history
        recordBorrowingHistory: {
          path: "/warehouse/record-detail/{recordId}/record-borrowing-history",
        },
      },
      // Asset management
      assetManagement: {
        path: "/warehouse/asset-management",
        assetList: {
          path: "/warehouse/asset-management/asset-list",
        },
        requestList: {
          path: "/warehouse/asset-management/request-list",
        },
      },
      // Asset detail
      assetDetail: {
        path: "/warehouse/asset-detail/{assetId}",
        assetInfo: {
          path: "/warehouse/asset-detail/{assetId}/asset-info",
        },
        assetChangeHistory: {
          path: "/warehouse/asset-detail/{assetId}/asset-change-history",
        },
        assetMaintenanceHistory: {
          path: "/warehouse/asset-detail/{assetId}/asset-maintenance-history",
        },
      },
    },
    // Foreign labor regulation
    foreignLaborRegulation: {
      path: "/foreign-labor-regulation",
      // Recruitment form
      recruitmentForm: {
        path: "/foreign-labor-regulation/recruitment-form", // Search params: recruitmentId
      },
      // Recruitment detail
      recruitmentDetail: {
        path: "/foreign-labor-regulation/recruitment-detail/{recruitmentId}",
      },
      // Recruitment list
      recruitmentList: {
        path: "/foreign-labor-regulation/recruitment-list",
        // All recruitment list
        allRecruitmentList: {
          path: "/foreign-labor-regulation/recruitment-list/all-recruitment-list",
        },
        // Opening recruitment list
        openingRecruitmentList: {
          path: "/foreign-labor-regulation/recruitment-list/opening-recruitment-list",
        },
        // Pending recruitment list
        pendingRecruitmentList: {
          path: "/foreign-labor-regulation/recruitment-list/pending-recruitment-list",
        },
        // Expired recruitment list
        expiredRecruitmentList: {
          path: "/foreign-labor-regulation/recruitment-list/expired-recruitment-list",
        },
        // Rejected recruitment list
        rejectedRecruitmentList: {
          path: "/foreign-labor-regulation/recruitment-list/rejected-recruitment-list",
        },
        // Canceled recruitment list
        canceledRecruitmentList: {
          path: "/foreign-labor-regulation/recruitment-list/canceled-recruitment-list",
        },
      },
      // Candidate list
      candidateList: {
        path: "/foreign-labor-regulation/candidate-list",
        // Unrecruited candidate list
        unrecruitedCandidateList: {
          path: "/foreign-labor-regulation/candidate-list/unrecruited-candidate-list",
        },
        // Archived candidate list
        archivedCandidateList: {
          path: "/foreign-labor-regulation/candidate-list/archived-candidate-list",
        },
      },
      // Candidate detail
      candidateDetail: {
        path: "/foreign-labor-regulation/candidate-detail/{candidateId}",
      },
      // Candidate form
      candidateForm: {
        path: "/foreign-labor-regulation/candidate-form", // Search params: candidateId, r
      },
      // Worker list
      workerList: {
        path: "/foreign-labor-regulation/worker-list",
      },
      // customer detail
      customerDetail: {
        path: "/foreign-labor-regulation/customer-detail/{customerId}",
      },
      // Worker detail
      workerDetail: {
        path: "/foreign-labor-regulation/{customerId}/worker-detail/{workerId}",
      },
      // Worker update form
      workerUpdateForm: {
        path: "/foreign-labor-regulation/{customerId}/worker-update-form/{workerId}", // Search params: r
      },
      // Record list
      recordList: {
        path: "/foreign-labor-regulation/record-list",
      },
      // Template list
      templateList: {
        path: "/foreign-labor-regulation/template-list",
      },
    },
    // Accounting
    accounting: {
      path: "/accounting",
      // Debt report
      debtReport: {
        path: "/accounting/debt-report",
      },
      // Cash fund book
      cashFundBook: {
        path: "/accounting/cash-fund-book/{cashFundBookId}",
      },
      // Bank voucher
      bankVoucher: {
        path: "/accounting/bank-voucher/{bankVoucherId}",
      },
      // Overpayment unit list
      overpaymentUnitList: {
        path: "/accounting/overpayment-unit-list",
      },
    },
    statistics: {
      path: "/statistics",
      // Expense and revenue report
      expenseAndRevenueReport: {
        path: "/statistics/expense-and-revenue-report",
        // Expense report
        expenseReport: {
          path: "/statistics/expense-and-revenue-report/expense-report",
        },
        // Summary revenue report
        summaryRevenueReport: {
          path: "/statistics/expense-and-revenue-report/summary-revenue-report",
        },
        // Detail revenue report
        detailRevenueReport: {
          path: "/statistics/expense-and-revenue-report/detail-revenue-report",
        },
      },
      // Tax debt customer list
      taxDebtCustomerList: {
        path: "/statistics/tax-debt-customer-list",
      },
      // Paid customer list
      paidCustomerList: {
        path: "/statistics/paid-customer-list",
      },
      // Customer list with money split record
      customerListWithMoneySplitRecord: {
        path: "/statistics/customer-list-with-money-split-record",
      },
      // Social insurance comparison report
      socialInsuranceComparisonReport: {
        path: "/statistics/social-insurance-comparison-report",
      },
      // Statistical table
      statisticalTable: {
        path: "/statistics/statistical-table",
      },
      // Report table
      reportTable: {
        path: "/statistics/report-table",
      },
      // Customer module data statistics
      customerModuleDataStatistics: {
        path: "/statistics/customer-module-data-statistics",
      },
      // Business module data statistics
      businessModuleDataStatistics: {
        path: "/statistics/business-module-data-statistics",
      },
      // Warehouse module data statistics
      warehouseModuleDataStatistics: {
        path: "/statistics/warehouse-module-data-statistics",
      },
      // Labor module data statistics
      laborModuleDataStatistics: {
        path: "/statistics/labor-module-data-statistics",
        // Total employee statistics
        totalEmployeeStatistics: {
          path: "/statistics/labor-module-data-statistics/total-employee-statistics",
        },
        // Employee increase statistics
        employeeIncreaseStatistics: {
          path: "/statistics/labor-module-data-statistics/employee-increase-statistics",
        },
        // Employee decrease statistics
        employeeDecreaseStatistics: {
          path: "/statistics/labor-module-data-statistics/employee-decrease-statistics",
        },
        // Customer and employee changes report
        customerAndEmployeeChangesReport: {
          path: "/statistics/labor-module-data-statistics/customer-and-employee-changes-report",
        },
      },
    },
  },
};

export default basePaths;
