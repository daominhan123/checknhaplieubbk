// ==UserScript==
// @name         chéc bbk
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Phím 1: Xác minh + Đồng ý + Đóng tab | Phím 2: Trả lại + Điền "làm lại" + Gửi + Đóng tab
// @author       MinhAn05
// @match        https://sohoa.bbksolution.com/*
// @grant        window.close
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('keydown', function(e) {
        // Nếu đang gõ trong ô nhập liệu thì không chạy phím tắt
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        // PHÍM 1: XÁC MINH & ĐÓNG TAB
        if (e.key === '1') {
            const btnVerify = document.querySelector('button.btn-success') ||
                             Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Đã xác minh'));

            if (btnVerify) {
                btnVerify.click();
                // Đợi modal hiện ra rồi ấn Đồng ý
                setTimeout(() => {
                    const btnConfirm = document.querySelector('.swal2-confirm') ||
                                      Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Đồng ý'));
                    if (btnConfirm) {
                        btnConfirm.click();
                        // Đóng tab sau khi đã lưu thành công
                        setTimeout(() => { window.close(); }, 800);
                    }
                }, 500);
            }
        }

        // PHÍM 2: TRẢ LẠI & ĐÓNG TAB
        if (e.key === '2') {
            const btnReturn = Array.from(document.querySelectorAll('button')).find(el => el.textContent.trim() === 'Trả lại');

            if (btnReturn) {
                btnReturn.click();

                setTimeout(() => {
                    const reasonInput = document.querySelector('textarea[placeholder*="lý do"]') ||
                                       document.querySelector('textarea');
                    const btnSubmit = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Gửi'));

                    if (reasonInput) {
                        reasonInput.value = 'làm lại';
                        reasonInput.dispatchEvent(new Event('input', { bubbles: true }));
                    }

                    if (btnSubmit) {
                        setTimeout(() => {
                            btnSubmit.click();
                            // Đóng tab sau khi đã gửi phản hồi
                            setTimeout(() => { window.close(); }, 800);
                        }, 200);
                    }
                }, 500);
            }
        }
    });
})();