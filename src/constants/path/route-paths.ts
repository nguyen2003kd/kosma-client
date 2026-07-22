const routePaths = {
  app: {
    path: "/:lang",
    // Auth
    auth: {
      path: "auth",
      signIn: {
        path: "sign-in",
      },
      passwordRecovery: {
        path: "password-recovery",
      },
    },
    // Main
    main: {
      path: "",
      // Profile
      profile: {
        path: "profile",
      },
      // System
      system: {
        path: "system",
        // User list
        userList: {
          path: "user-list",
        },
        // User form
        userForm: {
          path: "user-form", // Search params: userId
        },
        // User detail
        userDetail: {
          path: "user-detail/:userId",
        },
        // Activity history
        activityHistoryList: {
          path: "activity-history-list",
        },
        // Backup
        backup: {
          path: "backup",
        },
      },
      // Customer
      customer: {
        path: "customer",
        // Customer form
        customerForm: {
          path: "customer-form", // Search params: customerId, isRejected (true/false)
        },
        // Customer contract form
        customerContractForm: {
          path: ":customerId/customer-contract-form", // Search params: customerContractId
        },
        // Customer personnel form
        customerPersonnelForm: {
          path: ":customerId/customer-personnel-form", // Search params: customerPersonnelId
        },
        // Customer handler employee list update
        customerHandlerEmployeeListUpdate: {
          path: ":customerId/customer-handler-employee-list-update", // Search params: isAfterApproval
        },
        // Customer personnel dependent form
        customerPersonnelDependentForm: {
          path: ":customerId/:customerPersonnelId/customer-personnel-dependent-form", // Search params: customerPersonnelDependentId
        },
        // Customer personnel salary history form
        customerPersonnelSalaryHistoryForm: {
          path: ":customerId/:customerPersonnelId/customer-personnel-salary-history-form", // Search params: customerPersonnelSalaryHistoryId
        },
        // Customer personnel allowance form
        customerPersonnelAllowanceForm: {
          path: ":customerId/:customerPersonnelId/customer-personnel-allowance-form", // Search params: customerPersonnelAllowanceId
        },
        // Customer list
        customerList: {
          path: "customer-list",
          // All customer list
          allCustomerList: {
            path: "all-customer-list",
          },
          // Approved customer list
          approvedCustomerList: {
            path: "approved-customer-list",
          },
          // Rejected customer list
          rejectedCustomerList: {
            path: "rejected-customer-list",
          },
          // Service discontinued customer list
          serviceDiscontinuedCustomerList: {
            path: "service-discontinued-customer-list",
          },
        },
        // Customer detail
        customerDetail: {
          path: "customer-detail/:customerId",
          // Customer information
          customerInformation: {
            path: "customer-information",
          },
          // Contract list
          contractList: {
            path: "contract-list",
          },
          // Personnel list
          personnelList: {
            path: "personnel-list",
          },
          // Handler employee list
          handlerEmployeeList: {
            path: "handler-employee-list",
          },
          // Customer change history
          customerChangeHistory: {
            path: "customer-change-history",
          },
        },
        // Customer contract detail
        customerContractDetail: {
          path: ":customerId/customer-contract-detail/:customerContractId",
          //  Contract information
          contractInformation: {
            path: "contract-information",
          },
          // Contract change history
          contractChangeHistory: {
            path: "contract-change-history",
          },
        },
        // Customer personnel detail
        customerPersonnelDetail: {
          path: ":customerId/customer-personnel-detail/:customerPersonnelId",
          // Personnel information
          personnelInformation: {
            path: "personnel-information",
          },
          // Dependent list
          dependentList: {
            path: "dependent-list",
          },
          // Salary history list
          salaryHistoryList: {
            path: "salary-history-list",
          },
          // Allowance list
          allowanceList: {
            path: "allowance-list",
          },
          // Personnel change history
          personnelChangeHistory: {
            path: "personnel-change-history",
          },
        },
        // Customer personnel dependent detail
        customerPersonnelDependentDetail: {
          path: ":customerId/:customerPersonnelId/customer-personnel-dependent-detail/:customerPersonnelDependentId",
          // Dependent information
          dependentInformation: {
            path: "dependent-information",
          },
          // Dependent change history
          dependentChangeHistory: {
            path: "dependent-change-history",
          },
        },
      },
      // Clerical
      clerical: {
        path: "clerical",
        // Clerical creation form
        clericalCreationForm: {
          path: "clerical-creation-form", // Search params: clericalType (ClericalType)
        },
        // Clerical update form
        clericalUpdateForm: {
          path: "clerical-update-form/:clericalId", // Search params: clericalType (ClericalType)
        },
        // Clerical approval form
        clericalApprovalForm: {
          path: "clerical-approval-form/:clericalId",
        },
        // Clerical list
        clericalList: {
          path: "clerical-list",
          // Incoming clerical list
          incomingClericalList: { path: "incoming-clerical-list" },
          // Internal clerical list
          internalClericalList: { path: "internal-clerical-list" },
          // Outgoing clerical list
          outgoingClericalList: { path: "outgoing-clerical-list" },
          // Pending clerical list
          pendingClericalList: { path: "pending-clerical-list" },
          // Rejected clerical list
          rejectedClericalList: { path: "rejected-clerical-list" },
          // Clerical statistic
          clericalStatistic: {
            path: "clerical-statistic",
          },
        },
        // Clerical detail
        clericalDetail: {
          path: "clerical-detail/:clericalId",
          // Clerical information
          clericalInformation: {
            path: "clerical-information",
          },
          // Clerical change history
          clericalChangeHistory: {
            path: "clerical-change-history",
          },
        },
      },
      // Business
      business: {
        path: "business",
        // Customer list
        customerList: {
          path: "customer-list",
        },
        // Customer formula list
        customerFormulaList: {
          path: ":customerId/customer-formula-list",
        },
        // Customer formula form
        customerFormulaForm: {
          path: ":customerId/customer-formula-form", // Search params: formulaId, r
        },
        // Customer data export template form
        customerDataExportTemplateForm: {
          path: ":customerId/customer-data-export-template-form", // Search params: r
        },
        // Default column formula list
        defaultColumnFormulaList: {
          path: "default-column-formula-list",
        },
        // Default column formula form
        defaultColumnFormulaForm: {
          path: "default-column-formula-form/:columnCode",
        },
        // Personnel list
        personnelList: {
          path: ":customerId/personnel-list",
        },
        // Payroll list
        payrollList: {
          path: ":customerId/payroll-list",
        },
        // Data lookup
        dataLookup: {
          path: "data-lookup",
        },
        // Foreign taxable personnel list
        foreignTaxablePersonnelList: {
          path: "foreign-taxable-personnel-list",
        },
        // Foreign tax table
        foreignTaxTable: {
          path: ":customerId/:customerPersonnelId/foreign-tax-table",
        },
        // Net to gross conversion
        netToGrossConversion: {
          path: "net-to-gross-conversion",
        },
        // Replacement notice creation
        replacementNoticeCreation: {
          path: "replacement-notice-creation/:customerId/:noticeId", // Search params: period, customerCode
        },
        // Exchange rate
        exchangeRate: {
          path: "exchange-rate",
          exchangeRateConversion: {
            path: "exchange-rate-conversion",
          },
          exchangeRateChangeHistory: {
            path: "exchange-rate-change-history",
          },
        },
        // Ceiling level
        ceilingLevel: {
          path: "ceiling-level",
          ceilingLevelList: {
            path: "ceiling-level-list",
          },
          ceilingLevelChangeHistory: {
            path: "ceiling-level-change-history",
          },
        },
        // Notice list
        noticeList: {
          path: "notice-list",
          // Pending notice list
          pendingNoticeList: {
            path: "pending-notice-list", // Search params: customerCode
          },
          // Approved notice list
          approvedNoticeList: {
            path: "approved-notice-list",
          },
          // Rejected notice list
          rejectedNoticeList: {
            path: "rejected-notice-list",
          },
          // Cancelled customer list
          cancelledNoticeList: {
            path: "cancelled-notice-list",
          },
        },
        // Payroll unlocking request list
        payrollUnlockingRequestList: {
          path: "payroll-unlocking-request-list",
          // Pending payroll unlocking request list
          pendingPayrollUnlockingRequestList: {
            path: "pending-payroll-unlocking-request-list",
          },
          // Approved payroll unlocking request list
          approvedPayrollUnlockingRequestList: {
            path: "approved-payroll-unlocking-request-list",
          },
          // Rejected payroll unlocking request list
          rejectedPayrollUnlockingRequestList: {
            path: "rejected-payroll-unlocking-request-list",
          },
        },
        // Payroll formula editing request list
        payrollFormulaEditingRequestList: {
          path: "payroll-formula-editing-request-list",
          // Pending payroll formula editing request list
          pendingPayrollFormulaEditingRequestList: {
            path: "pending-payroll-formula-editing-request-list",
          },
          // Approved payroll formula editing request list
          approvedPayrollFormulaEditingRequestList: {
            path: "approved-payroll-formula-editing-request-list",
          },
          // Rejected payroll formula editing request list
          rejectedPayrollFormulaEditingRequestList: {
            path: "rejected-payroll-formula-editing-request-list",
          },
        },
      },
      // Warehouse
      warehouse: {
        path: "warehouse",
        // Warehouse diagram
        warehouseDiagram: {
          path: "warehouse-diagram",
        },
        // Request list
        requestList: {
          path: "request-list",
        },
        // Insertion request form
        insertionRequestForm: {
          path: "insertion-request-form", // Search params: requestId
        },
        // Borrowing request form
        borrowingRequestForm: {
          path: "borrowing-request-form", // Search params: requestId
        },
        // Return request form
        returnRequestForm: {
          path: "return-request-form", // Search params: requestId, borrowRequestId, rawRecords
        },
        // Cancellation request form
        cancellationRequestForm: {
          path: "cancellation-request-form", // Search params: requestId
        },
        // Record update request form
        recordUpdateRequestForm: {
          path: "record-update-request-form", // Search params: requestId, recordId
        },
        // Warehouse diagram update request form
        warehouseDiagramUpdateRequestForm: {
          path: "warehouse-diagram-update-request-form", // Search params: requestId
        },
        // Asset form
        assetForm: {
          path: "asset-form", // Search params: assetId
        },
        // Asset request update form
        assetRequestUpdateForm: {
          path: "asset-request-update-form/:requestId/:requestAction",
        },
        // Insertion request detail
        insertionRequestDetail: {
          path: "insertion-request-detail/:requestId",
        },
        // Borrowing request detail
        borrowingRequestDetail: {
          path: "borrowing-request-detail/:requestId",
        },
        // Return request detail
        returnRequestDetail: {
          path: "return-request-detail/:requestId",
        },
        // Cancellation request detail
        cancellationRequestDetail: {
          path: "cancellation-request-detail/:requestId",
        },
        // Record update request detail
        recordUpdateRequestDetail: {
          path: "record-update-request-detail/:requestId",
        },
        // Warehouse diagram update request detail
        warehouseDiagramUpdateRequestDetail: {
          path: "warehouse-diagram-update-request-detail/:requestId",
        },
        // Asset request detail
        assetRequestDetail: {
          path: "asset-request-detail/:requestId",
        },
        // Record detail
        recordDetail: {
          path: "record-detail/:recordId",
          // Record information
          recordInformation: {
            path: "record-information",
          },
          // Record change history
          recordChangeHistory: {
            path: "record-change-history",
          },
          // Record borrowing history
          recordBorrowingHistory: {
            path: "record-borrowing-history",
          },
        },
        // Asset management
        assetManagement: {
          path: "asset-management",
          assetList: {
            path: "asset-list",
          },
          requestList: {
            path: "request-list",
          },
        },
        // Asset detail
        assetDetail: {
          path: "asset-detail/:assetId",
          assetInfo: {
            path: "asset-info",
          },
          assetChangeHistory: {
            path: "asset-change-history",
          },
          assetMaintenanceHistory: {
            path: "asset-maintenance-history",
          },
        },
      },
      // Foreign labor regulation
      foreignLaborRegulation: {
        path: "foreign-labor-regulation",
        // Recruitment form
        recruitmentForm: {
          path: "recruitment-form", // Search params: recruitmentId
        },
        // Recruitment detail
        recruitmentDetail: {
          path: "recruitment-detail/:recruitmentId",
        },
        // Recruitment list
        recruitmentList: {
          path: "recruitment-list",
          // All recruitment list
          allRecruitmentList: {
            path: "all-recruitment-list",
          },
          // Opening recruitment list
          openingRecruitmentList: {
            path: "opening-recruitment-list",
          },
          // Pending recruitment list
          pendingRecruitmentList: {
            path: "pending-recruitment-list",
          },
          // Rejected recruitment list
          rejectedRecruitmentList: {
            path: "rejected-recruitment-list",
          },
          // Expired recruitment list
          expiredRecruitmentList: {
            path: "expired-recruitment-list",
          },
          // Canceled recruitment list
          canceledRecruitmentList: {
            path: "canceled-recruitment-list",
          },
        },
        // Candidate list
        candidateList: {
          path: "candidate-list",
          // Unrecruited candidate list
          unrecruitedCandidateList: {
            path: "unrecruited-candidate-list",
          },
          // Archived candidate list
          archivedCandidateList: {
            path: "archived-candidate-list",
          },
        },
        // Candidate form
        candidateForm: {
          path: "candidate-form", // Search params: candidateId, r
        },
        // Candidate detail
        candidateDetail: {
          path: "candidate-detail/:candidateId",
        },
        // Worker list
        workerList: {
          path: "worker-list",
        },
        // Customer detail
        customerDetail: {
          path: "customer-detail/:customerId",
        },
        // Worker detail
        workerDetail: {
          path: ":customerId/worker-detail/:workerId",
        },
        // Worker update form
        workerUpdateForm: {
          path: ":customerId/worker-update-form/:workerId", // Search params: r
        },
        // Record list
        recordList: {
          path: "record-list",
        },
        // Template list
        templateList: {
          path: "template-list",
        },
      },
      // Accounting
      accounting: {
        path: "accounting",
        // Debt report
        debtReport: {
          path: "debt-report",
        },
        // Cash fund book
        cashFundBook: {
          path: "cash-fund-book/:cashFundBookId",
        },
        // Bank voucher
        bankVoucher: {
          path: "bank-voucher/:bankVoucherId",
        },
        // Overpayment unit list
        overpaymentUnitList: {
          path: "overpayment-unit-list",
        },
      },
      // Statistics
      statistics: {
        path: "statistics",
        // Expense and revenue report
        expenseAndRevenueReport: {
          path: "expense-and-revenue-report",
          // Expense report
          expenseReport: {
            path: "expense-report",
          },
          // Summary revenue report
          summaryRevenueReport: {
            path: "summary-revenue-report",
          },
          // Detail revenue report
          detailRevenueReport: {
            path: "detail-revenue-report",
          },
        },
        // Tax debt customer list
        taxDebtCustomerList: {
          path: "tax-debt-customer-list",
        },
        // Paid customer list
        paidCustomerList: {
          path: "paid-customer-list",
        },
        // Customer list with money split record
        customerListWithMoneySplitRecord: {
          path: "customer-list-with-money-split-record",
        },
        // Social insurance comparison report
        socialInsuranceComparisonReport: {
          path: "social-insurance-comparison-report",
        },
        // Statistical table
        statisticalTable: {
          path: "statistical-table",
        },
        // Report table
        reportTable: {
          path: "report-table",
        },
        // Customer module data statistics
        customerModuleDataStatistics: {
          path: "customer-module-data-statistics",
        },
        // Business module data statistics
        businessModuleDataStatistics: {
          path: "business-module-data-statistics",
        },
        // Warehouse module data statistics
        warehouseModuleDataStatistics: {
          path: "warehouse-module-data-statistics",
        },
        // Labor module data statistics
        laborModuleDataStatistics: {
          path: "labor-module-data-statistics",
          // Total employee statistics
          totalEmployeeStatistics: {
            path: "total-employee-statistics",
          },
          // Employee increase statistics
          employeeIncreaseStatistics: {
            path: "employee-increase-statistics",
          },
          // Employee decrease statistics
          employeeDecreaseStatistics: {
            path: "employee-decrease-statistics",
          },
          // Customer and employee changes report
          customerAndEmployeeChangesReport: {
            path: "customer-and-employee-changes-report",
          },
        },
      },
    },
  },
};

export default routePaths;
