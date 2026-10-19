// document.querySelectorAll('.panel').forEach(panel => {
//     const masalaBtn = panel.querySelector('.masalaBtn');
//     const interviewBtn = panel.querySelector('.interviewBtn');
//     const masalaContent = panel.querySelector('.masalaContent');
//     const interviewContent = panel.querySelector('.interviewContent');

//     masalaBtn.addEventListener('click', () => {
//         masalaContent.style.display = masalaContent.style.display === 'none' ? 'block' : 'none';
//         interviewContent.style.display = 'none';
//     });

//     interviewBtn.addEventListener('click', () => {
//         interviewContent.style.display = interviewContent.style.display === 'none' ? 'block' : 'none';
//         masalaContent.style.display = 'none';
//     });
// });
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.panel').forEach(panel => {
        const masalaBtn = panel.querySelector('.masalaBtn');
        const interviewBtn = panel.querySelector('.interviewBtn');
        const masalaContent = panel.querySelector('.masalaContent');
        const interviewContent = panel.querySelector('.interviewContent');

        if (masalaBtn && interviewBtn && masalaContent && interviewContent) {
            masalaBtn.addEventListener('click', () => {
                masalaContent.style.display = masalaContent.style.display === 'none' ? 'block' : 'none';
                interviewContent.style.display = 'none';
            });

            interviewBtn.addEventListener('click', () => {
                interviewContent.style.display = interviewContent.style.display === 'none' ? 'block' : 'none';
                masalaContent.style.display = 'none';
            });
        }
    });
});
