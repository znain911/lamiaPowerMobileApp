import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from "react-navigation-drawer";

import Login from '../screen/login';
import Landing from '../screen/landing';
import Client from '../screen/client';
import Detail from '../screen/detail';
import Cost from '../screen/cost';
import NewClient from '../screen/newClient';
import AddPayment from '../screen/addPayment';
import AddCosting from '../screen/addCosting';
import DeletePayment from '../screen/deletePayment';
import DeleteCosting from '../screen/deleteCosting';
import ResetPass from '../screen/resetpass';
import DeletClient from '../screen/deleteclient';
import DeleteC from '../screen/deleteC';
import OfficeList from '../screen/officeList';
import OfficeInfo from '../screen/officeinfo';
import EditOfficeInfo from '../screen/editOfficeInfo';
import SalaryInfo from '../screen/salaryInfo';
import AddEmployee from '../screen/addEmployee';
import LoanDetail from '../screen/loanInfo';
import AddLoan from '../screen/addLoan';
import RepayLoan from '../screen/repayLoan';
import RepayDetail from '../screen/repayDetail';
import DeleteEmployee from '../screen/deleteEmployee';
import DailyCost from '../screen/dailyCosting';
import AddDailyCosting from '../screen/addDailyCosting';
import MonthlyCost from '../screen/monthlyCost';
import Investor from '../screen/investor';
import EditInvest from '../screen/editInvest';
import InvestorLoan from '../screen/investorLoan';
import InvestorLoanPay from '../screen/investorLoanPay';
import AddInvestorLoan from '../screen/addInvestorLoan';
import Complete from '../screen/completion';
import LiftServicing from '../screen/liftServicing';
import WarrantyList from '../screen/warrantyList';
import WarrantyUpdate from '../screen/warrantyUpdate';
import DeleteLoan from '../screen/deleteLoan';
import DeleteRepay from '../screen/deleteRepay';
import SalaryPayment from '../screen/salarypayment';
import AddSalary from '../screen/addSalary';
import DeleteSalary from '../screen/deleteSalary';

const LoginScreens = createStackNavigator(
    {
        Login : Login,
        Landing: Landing,
        Client: Client,
        Detail: Detail,
        Cost: Cost,
        NewClient: NewClient,
        AddPayment: AddPayment,
        AddCosting: AddCosting,
        DeletePayment: DeletePayment,
        DeleteCosting: DeleteCosting,
        ResetPass: ResetPass,
        DeletClient: DeletClient,
        DeleteC: DeleteC,
        OfficeList: OfficeList,
        OfficeInfo: OfficeInfo,
        EditOfficeInfo: EditOfficeInfo,
        SalaryInfo: SalaryInfo,
        AddEmployee: AddEmployee,
        LoanDetail: LoanDetail,
        AddLoan: AddLoan,
        RepayLoan: RepayLoan,
        RepayDetail: RepayDetail,
        DeleteEmployee: DeleteEmployee,
        DailyCost: DailyCost,
        AddDailyCosting: AddDailyCosting,
        AddDailyCosting: AddDailyCosting,
        MonthlyCost: MonthlyCost,
        Investor: Investor,
        EditInvest: EditInvest,
        InvestorLoan: InvestorLoan,
        InvestorLoanPay: InvestorLoanPay,
        AddInvestorLoan: AddInvestorLoan,
        Complete: Complete,
        LiftServicing: LiftServicing,
        WarrantyList: WarrantyList,
        WarrantyUpdate: WarrantyUpdate,
        DeleteLoan: DeleteLoan,
        DeleteRepay: DeleteRepay,
        SalaryPayment: SalaryPayment,
        AddSalary: AddSalary,
        DeleteSalary: DeleteSalary,
        
    },
    {
        defaultNavigationOptions: {
            headerShown: false
        }
        
    }
);

const Drawercontroler = createDrawerNavigator(
    {
        LoginScreens: LoginScreens
    }

);


export default createAppContainer(Drawercontroler);