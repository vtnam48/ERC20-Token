//SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/extensions/AccessControlEnumerable.sol";

contract Vault is Ownable, AccessControlEnumerable {
    // set vault nay nap, rut token nao
    IERC20 private token;

    // so luong rut max
    uint256 public maxWithdrawAmount;

    // bat tat chuc nang rut
    bool public withdrawEnable;

    bytes32 public constant WITHDRAWER_ROLE = keccak256("WITHDRAW_ROLE");

    function setWithdrawEnable(bool _isEnable) public onlyOwner {
        withdrawEnable = _isEnable;
    }
    
    function setMaxWithdrawAmount(uint256 _maxWithdrawAmount) public onlyOwner {
        maxWithdrawAmount = _maxWithdrawAmount;
    }

    function setToken(IERC20 _token) public onlyOwner {
        token = _token;
    }

    constructor() Ownable(msg.sender) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function withdraw(
        uint256 _amount,
        address _to
    ) external onlyWithdrawer {
        require(withdrawEnable, "withdraw is not available.");
        require(_amount <= maxWithdrawAmount, "exceed maximum amount");
        token.transfer(_to, _amount);
    }

    function deposit(uint256 _amount) external {
        require(token.balanceOf(msg.sender) >= _amount,
        "Insufficient account balance"
        );
        SafeERC20.safeTransferFrom(token, msg.sender, address(this), _amount);
    }

    modifier onlyWithdrawer() {
        require(owner() == _msgSender()||hasRole(WITHDRAWER_ROLE,_msgSender()), "Caller is not a withdrawer");
        _;
    }
}
