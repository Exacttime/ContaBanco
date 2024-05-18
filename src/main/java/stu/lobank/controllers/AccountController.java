package stu.lobank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stu.lobank.domain.dto.request.TransferRequest;
import stu.lobank.domain.entities.Conta;
import stu.lobank.domain.entities.Transacao;
import stu.lobank.services.AccountService;

import java.util.List;

@RestController
public class AccountController extends BaseController {
    private final AccountService accountService;
    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }
    @GetMapping("/contas")
    public List<Conta> getAllAccounts() {
        return accountService.getAllAccounts();
    }
    @GetMapping("/conta/{number}")
    public Conta getAccount(@PathVariable int number) {
        return accountService.getAccount(number);
    }
    @GetMapping("/conta/{accountNumber}/transactions")
    public List<Transacao> getTransactions(@PathVariable int accountNumber) {
        return accountService.getAccount(accountNumber).getTransacoes();
    }
    @PostMapping("/conta")
    public void createAccount(@RequestBody Conta conta) {
        accountService.createAccount(conta);
    }
    @PostMapping("/conta/{sourceNumber}/transfer/{destinationNumber}")
    public void transferMoney(@PathVariable int sourceNumber, @PathVariable int destinationNumber, @RequestBody TransferRequest transferRequest) {
        Conta sourceAccount = accountService.getAccount(sourceNumber);
        Conta destinationAccount = accountService.getAccount(destinationNumber);
        sourceAccount.transfer(transferRequest.getAmount(), destinationAccount);
        accountService.updateAccount(sourceAccount);
        accountService.updateAccount(destinationAccount);
    }
    @PostMapping("/conta/deposit/{sourceNumber}")
    public void depositMoney(@PathVariable int sourceNumber, @RequestBody double amount){
        Conta sourceAccount = accountService.getAccount(sourceNumber);
        sourceAccount.deposit(amount);
        accountService.updateAccount(sourceAccount);
    }

}
