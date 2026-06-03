// ── CONSTANTS ──
const ALEX   = { lat: 52.5219, lng: 13.4132 };

const MAP_STYLES_LIGHT = [
  { elementType: 'geometry', stylers: [{ color: '#F0EBE3' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#F5F1EC' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#BDD5E7' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#FFFFFF' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#E0D9D0' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#F8D398' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#C8DCBA' }] },
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#E8E4E0' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#C9B8A8' }] },
];

const MAP_STYLES_DARK = [
  { elementType: 'geometry', stylers: [{ color: '#242020' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#9E8E7E' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1A1714' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263C' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2C2825' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#1A1714' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3D3020' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#1E2B1A' }] },
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2A2521' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#3A3530' }] },
];
const RADIUS = 10000;

const CAT_COLOR = {
  cafe:      '#FF9500',
  park:      '#00C853',
  library:   '#4361EE',
  museum:    '#9B5DE5',
  jobcenter: '#1A3A5C',
  mensa:     '#FF69B4',
  gym:       '#14B8A6',
  pool:      '#00B4D8',
  bar:       '#C0392B',
};

const TYPE_LABELS = { cafe:'Café', park:'Park', library:'Library', museum:'Museum', jobcenter:'Job Center', mensa:'Mensa', gym:'Gym', pool:'Pools & Lakes', bar:'Bar & Pub' };

const DESCS = {
  cafe:      ['Specialty coffee roasted with love.','A cosy corner for slow mornings.','Third-wave brews and a warm welcome.','Great beans, even better vibes.','Your next favourite local café.','Outstanding espresso in the heart of Berlin.','Light-filled spot with excellent pastries.','Hidden gem beloved by neighbourhood regulars.'],
  park:      ['Green oasis in the urban jungle.','Perfect for weekend cycling and picnics.','Beloved by locals for a reason.','Fresh air and open skies await.','Berlin\'s hidden green gem.','Great trails and stunning city views.','Waterside walks and weekend markets.','Historic grounds with beautiful landscaping.'],
  library:   ['Free wifi, warm space, zero judgment.','Thousands of books and a quiet corner waiting for you.','A calm refuge with free membership for Berlin residents.','Read, study, or just sit. All welcome.','Free access to books, magazines, and your thoughts.'],
  museum:    ['Free entry — come as many times as you like.','World-class art and history, at no cost.','A whole afternoon for free. Take your time.','One of Berlin\'s best kept free secrets.','Thought-provoking exhibits, always free.'],
  jobcenter: ['Guidance, support, and next steps — all in one place.','Free counselling and job placement support.','They\'ve helped thousands get back on their feet.','Practical support for your next chapter.','Resources, workshops, and a friendly team ready to help.','A course, a new skill, a fresh start.','Free or subsidised — Berlin has a school for where you are now.','Language, trade, or tech — there\'s a class for the next chapter.'],
  mensa:     ['Hot meals from €2.20 — open to everyone.','University canteen with daily fresh menus under €4.','Great food, great prices, great company.','Student prices for all. No ID needed.','Warm, filling meals that won\'t break the bank.'],
  gym:       ['Move your body, clear your head.','Affordable membership, no pressure.','A space to feel strong again.','Drop-in friendly — come as you are.','Sweat it out and reset.'],
  pool:      ['Cool off and float your worries away.','Open-air swimming the Berlin way.','A free dip in nature\'s pool.','Bring a towel and stay all afternoon.','Calm water, open sky, no entry fee at the lakes.'],
  bar:       ['A glass of something and nowhere to be.','Berlin Kneipe energy. Stay as long as you like.','Good drinks, no judgment.','The kind of place you can sit alone and feel fine.','Cold beer, warm light, honest prices.'],
};

const TYPE_ICONS = {
  cafe:      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  park:      `<svg width="20" height="20" viewBox="0 0 160 177" fill="none" stroke="#fff" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M62.2297 88.3993C62.7607 86.255 64.9295 84.9471 67.0739 85.4781C69.2183 86.0091 70.5262 88.1779 69.9952 90.3222C69.1545 93.717 65.6508 109.458 60.9024 132.556C59.0863 145.099 58.7922 150.821 58.636 154.445C58.6024 155.92 58.6391 156.994 58.8724 159.028C59.124 161.223 57.5486 163.206 55.354 163.458C53.1594 163.709 51.176 162.134 50.9243 159.939C50.6493 157.541 50.5944 156.098 50.6391 154.209L50.6422 154.131C50.8096 150.239 51.1264 144.231 53.0011 131.303L53.0179 131.187L53.0413 131.072C57.8012 107.913 61.3442 91.9752 62.2297 88.3993Z" fill="#fff"/><path d="M96.7297 84.0651C98.8645 84.6328 100.135 86.8232 99.5675 88.9581C98.5818 92.6664 95.9452 108.817 94.5565 126.124L94.5528 126.172L94.5482 126.219C93.9583 131.888 93.6864 140.289 93.6533 150.009L93.6531 154.251L93.6534 154.283L93.6535 154.315C93.598 158.735 93.3773 160.107 93.2857 161.525C93.1431 163.729 91.2404 165.401 89.0361 165.258C86.8316 165.116 85.1592 163.213 85.3017 161.009C85.4176 159.215 85.6006 158.366 85.6532 154.246C85.6156 142.771 85.8685 132.413 86.5819 125.485C87.9819 108.037 90.6629 91.3152 91.8359 86.9027C92.4034 84.7677 94.5948 83.4976 96.7297 84.0651Z" fill="#fff"/><path d="M77.8022 12.9815C85.4989 14.5086 96.8164 19.8849 104.153 31.5019C106.817 35.72 108.602 39.4447 109.826 42.4803C110.272 42.0046 110.758 41.5582 111.283 41.1729C115.371 38.175 119.955 39.5367 122.798 41.3724C126.673 43.8741 132.868 47.4107 137.807 51.8205C142.78 56.261 147.375 62.3418 147.019 70.302C146.711 77.1592 146.234 84.1854 145.019 90.0024C144.41 92.9176 143.583 95.6968 142.404 98.0714C141.229 100.437 139.578 102.656 137.191 104.074C133.35 106.358 128.505 108.199 124.48 109.35C122.456 109.928 120.527 110.365 118.933 110.59C118.146 110.701 117.338 110.775 116.592 110.764C116.088 110.756 114.73 110.724 113.514 109.944C111.654 108.751 111.113 106.277 112.306 104.417C113.303 102.862 115.197 102.23 116.878 102.762C117.077 102.754 117.385 102.728 117.814 102.668C118.934 102.51 120.486 102.17 122.281 101.657C125.894 100.624 130.042 99.0173 133.103 97.1978C133.714 96.8346 134.47 96.0615 135.238 94.5142C136.002 92.976 136.654 90.9202 137.187 88.3669C138.257 83.246 138.719 76.797 139.026 69.9447C139.223 65.5547 136.767 61.6166 132.479 57.788C128.156 53.9285 122.878 50.9451 118.46 48.0931C117.777 47.6521 117.189 47.4635 116.785 47.4268C116.453 47.3967 116.239 47.4586 116.014 47.6241C115.634 47.9026 114.98 48.6902 114.226 50.0054C113.536 51.207 112.99 52.4385 112.667 53.1889C112.594 53.357 112.471 53.6203 112.283 53.9088C112.118 54.1623 111.744 54.685 111.084 55.1221C110.312 55.634 109.184 55.9877 107.924 55.6985C106.824 55.4464 106.14 54.8185 105.83 54.486C105.263 53.8762 104.999 53.2117 104.937 53.0627C104.825 52.7917 104.737 52.5197 104.672 52.3138C104.546 51.9131 104.389 51.3527 104.241 50.839C104.081 50.2811 103.89 49.6324 103.65 48.8908C102.699 45.95 100.938 41.3928 97.3893 35.7737C91.4172 26.318 82.1581 21.9944 76.2331 20.8255C76.1062 20.9592 75.9259 21.1727 75.6908 21.5041C74.7725 22.7987 73.9272 24.6099 72.8054 26.8753C71.821 28.8635 71.3482 30.7547 71.1807 32.4047C72.1352 34.6292 72.8442 37.035 73.0716 39.4596C73.0973 39.7334 73.1708 40.5703 72.8344 41.4984C72.6451 42.0205 72.2212 42.8567 71.3026 43.4914C70.3079 44.1787 69.2192 44.2967 68.3719 44.1702C67.0349 43.9704 66.2064 43.1711 66.0434 43.0181C65.7234 42.7178 65.4786 42.4077 65.3125 42.1792C64.6818 41.3108 64.0824 40.0733 63.7456 38.8454C63.3689 37.4714 63.1259 35.8419 63.1079 34.0385C62.0785 32.0514 60.8175 30.2837 59.713 29.1163C58.7727 28.1224 57.3942 27.7532 55.1561 28.0905C53.7148 28.3078 51.8527 28.8705 49.4617 29.6876C47.1974 30.4614 44.4462 31.4683 41.6955 32.3219C38.1831 33.412 35.7045 37.2053 34.1709 42.4277C32.6994 47.4385 32.5345 52.3455 32.5725 53.181C32.5989 53.7589 33.1808 54.7705 35.4804 55.8488C36.4485 56.3028 37.4245 56.6186 38.1341 56.8128C38.4278 56.8932 38.6625 56.9474 38.8138 56.9811C38.8852 56.9953 38.9563 57.011 39.0273 57.0249L39.1299 57.0453C39.1482 57.0493 39.19 57.0593 39.242 57.072C39.2661 57.078 39.3193 57.0907 39.3856 57.1096C39.419 57.1193 39.4994 57.1443 39.5463 57.1595C39.6195 57.1845 39.8177 57.26 39.9417 57.3137C40.2121 57.449 41.261 58.277 41.8508 59.1315C42.1968 61.8219 39.9389 64.6013 39.0394 64.8862C38.7597 64.9293 38.3474 64.9566 38.2172 64.9563C38.143 64.9542 38.0207 64.9485 37.9725 64.945C37.8265 64.9333 37.7086 64.9143 37.7036 64.9136C37.6413 64.9044 37.5891 64.8959 37.5691 64.8924C37.4713 64.8751 37.3493 64.8506 37.2172 64.8223C37.1964 64.8179 37.1748 64.8122 37.1525 64.8073C32.9037 63.9632 29.7575 63.1587 26.6979 62.628C25.2337 62.374 24.1168 62.2507 23.2914 62.2503C22.7528 62.25 22.4999 62.3017 22.4318 62.3171C18.53 64.6238 17.1548 67.2368 16.5674 69.4476C16.2497 70.6436 16.1372 71.832 16.0903 73.0036C16.0655 73.6238 16.0607 74.1231 16.0449 74.7389C16.0319 75.2472 16.0081 75.884 15.9278 76.4956C15.9412 76.5395 16.0349 77.0007 16.8428 77.9808C17.8243 79.1713 19.3899 80.5462 21.4094 82.0311C25.4427 84.9968 30.4518 87.812 34.2035 90.0183C34.2051 90.0192 34.2236 90.0296 34.2663 90.0489C34.3164 90.0715 34.3859 90.1007 34.4911 90.1408C34.5686 90.1703 35.1385 90.3754 35.4564 90.5086C36.1135 90.784 38.263 91.7363 38.803 94.285L38.8502 94.5372L38.8875 94.7889C39.227 97.3804 38.262 99.6926 37.7796 100.884C37.4637 101.664 37.2908 102.071 37.1763 102.451C37.1696 102.473 37.1652 102.494 37.1599 102.513C37.26 102.783 37.5112 103.152 38.2002 103.618C39.1391 104.253 40.5702 104.835 42.4693 105.335C46.459 106.385 50.5459 106.664 54.2002 107.292C54.7545 107.387 55.4032 107.288 56.2537 106.869C57.1118 106.447 57.9338 105.82 58.8023 105.109C59.0701 104.856 59.2328 104.674 59.3517 104.507C59.4721 104.339 59.5946 104.124 59.7096 103.789C59.9722 103.025 60.1878 101.717 60.4654 96.7024C60.5876 94.4967 62.4745 92.808 64.6803 92.9301C66.8859 93.0523 68.5747 94.9393 68.4526 97.145C68.192 101.851 67.9704 104.366 67.2753 106.389C66.5125 108.608 65.3125 109.991 64.146 111.067L64.0638 111.143L63.9765 111.215C62.329 112.57 58.16 116.09 52.8453 115.177C50.3035 114.74 44.7867 114.217 40.4338 113.072C38.1617 112.474 35.7367 111.61 33.7182 110.245C31.6421 108.841 29.7503 106.723 29.2216 103.681C28.9741 102.257 29.2638 100.983 29.5178 100.141C29.7687 99.3088 30.1416 98.4332 30.3649 97.8818C30.4734 97.6139 30.5612 97.3801 30.635 97.177C30.4777 97.0982 30.314 97.012 30.1486 96.9147C26.6273 94.844 21.1269 91.7538 16.6695 88.4763C14.4437 86.8396 12.268 85.0084 10.67 83.0701C9.17178 81.2527 7.5538 78.5829 7.99667 75.4653C8.01558 75.3322 8.03439 75.0713 8.04812 74.5343C8.05976 74.0785 8.06855 73.3714 8.09608 72.683C8.15392 71.237 8.30392 69.3944 8.8353 67.3941C9.94237 63.2268 12.5988 58.8012 18.4698 55.3661C20.0646 54.433 21.8622 54.2494 23.2955 54.2501C23.7358 54.2503 24.1879 54.2693 24.6478 54.3023C24.6172 54.0555 24.5925 53.8035 24.5808 53.5452C24.5065 51.9135 24.75 46.1142 26.4944 40.1737C28.1768 34.4448 31.7214 27.041 39.3248 24.6814C41.9375 23.8706 44.3737 22.9718 46.8744 22.1172C49.2482 21.306 51.7289 20.5173 53.9638 20.1804C57.3852 19.6648 61.9761 19.8854 65.505 23.5987C65.5486 23.5079 65.591 23.4162 65.636 23.3253C66.5697 21.4396 67.7786 18.8309 69.1659 16.8753C70.4195 15.108 73.0281 12.1508 77.0693 12.8453L77.8022 12.9815Z" fill="#fff"/><path d="M94.6814 85.2083C96.881 85.0041 98.83 86.6218 99.0343 88.8214C99.3729 92.4701 99.3807 93.744 99.4127 95.033L99.4118 95.0327C99.4567 96.3735 99.4508 97.9723 99.4427 99.633C99.4423 99.7005 99.442 99.7682 99.4417 99.836C100.178 99.5751 101.078 99.4479 102.106 99.6849L102.334 99.7443C103.448 100.063 104.197 100.734 104.46 100.972C104.816 101.294 105.178 101.689 105.352 101.873C105.585 102.12 105.735 102.273 105.869 102.391C105.999 102.506 106.041 102.522 106.007 102.504C110.738 104.949 116.199 105.733 118.063 105.956C120.257 106.219 121.822 108.21 121.56 110.404C121.297 112.597 119.307 114.163 117.113 113.9C115.057 113.654 108.4 112.746 102.333 109.611C101.973 109.425 101.641 109.213 101.337 108.995C100.847 109.577 100.113 110.356 99.1137 110.948C97.7408 111.763 96.134 111.776 94.7965 111.12C93.7031 110.583 93.0566 109.739 92.7195 109.212C92.015 108.11 91.655 106.795 91.4956 105.667L91.4607 105.422L91.4566 105.175C91.4232 103.194 91.4349 101.283 91.4432 99.5939C91.4515 97.8747 91.4563 96.4297 91.4164 95.2692L91.4152 95.2498L91.4149 95.2306C91.3853 94.0383 91.3839 92.9616 91.0683 89.5612C90.8641 87.3616 92.4818 85.4125 94.6814 85.2083Z" fill="#fff"/><path d="M87.482 159.23C89.6868 159.091 91.5862 160.767 91.7243 162.972C91.8623 165.177 90.1871 167.077 87.9825 167.215C84.8046 167.414 83.593 167.445 82.3268 167.429C81.0563 167.413 80.1618 167.364 78.8703 167.395C75.8645 167.47 70.9375 167.447 66.1306 167.424C61.2603 167.4 56.5133 167.378 53.713 167.451C51.5046 167.51 49.6668 165.766 49.6086 163.558C49.5506 161.35 51.2938 159.513 53.502 159.454C56.4594 159.376 61.3637 159.4 66.17 159.423C71.0395 159.447 75.8153 159.47 78.6703 159.399L78.6733 159.398C80.1559 159.363 81.4693 159.418 82.4282 159.43C83.3925 159.442 84.3683 159.425 87.482 159.23Z" fill="#fff"/></svg>`,
  library:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  museum:    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 9 12 2 21 9"/><rect x="3" y="9" width="18" height="13"/><line x1="9" y1="22" x2="9" y2="14"/><line x1="15" y1="22" x2="15" y2="14"/></svg>`,
  jobcenter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
  mensa:     `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18"/><path d="M5 11c0 4 3.1 7 7 7s7-3 7-7"/><path d="M7 7c0-1.5 1-2 1-3.5"/><path d="M12 7c0-1.5 1-2 1-3.5"/><path d="M17 7c0-1.5 1-2 1-3.5"/></svg>`,
  gym:       `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="3" height="8" rx="1"/><rect x="19" y="8" width="3" height="8" rx="1"/><rect x="5" y="10" width="2.5" height="4" rx="0.5"/><rect x="16.5" y="10" width="2.5" height="4" rx="0.5"/><line x1="7.5" y1="12" x2="16.5" y2="12"/></svg>`,
  pool:      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1"/></svg>`,
  bar:       `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12l-3 9a3 3 0 0 1-6 0L6 2z"/><line x1="12" y1="14" x2="12" y2="21"/><line x1="8" y1="21" x2="16" y2="21"/></svg>`,
};

const BLOBS = [
  'border-radius:50%',
  'border-radius:60% 40% 60% 40% / 40% 60% 40% 60%',
  'border-radius:40% 60% 55% 45% / 55% 45% 60% 40%',
  'border-radius:70% 30% 50% 50% / 40% 60% 40% 60%',
  'border-radius:40% 60% 40% 60% / 60% 40% 70% 30%',
  'border-radius:30% 70% 70% 30% / 30% 30% 70% 70%',
];

const AVATAR_COLORS = ['#FF3D00','#7B2FFF','#FF9500','#00B4FF','#00D68F','#FF00C8','#FFD600','#FF4D6D'];

const TAG_DEFS = [
  // Cost — exclusive (only the highest-voted wins per place)
  { id:'free',         label:'Free entry',        emoji:'💸', color:'#D4F5E2', dimension:'cost',        exclusive:true,  keywords:['free','no charge','gratis','kostenlos','free entry','no fee','frei','umsonst'] },
  { id:'cheap',        label:'Budget-friendly',   emoji:'🪙', color:'#FFF3CD', dimension:'cost',        exclusive:true,  keywords:['cheap','affordable','inexpensive','budget','good value','günstig','preiswert','€2','€3','€4'] },
  { id:'expensive',    label:'Pricey',            emoji:'🏷️', color:'#FFE0E0', dimension:'cost',        exclusive:true,  keywords:['expensive','overpriced','pricey','teuer','not cheap','costly','zu teuer'] },
  // Atmosphere — exclusive
  { id:'quiet',        label:'Quiet & calm',      emoji:'🤫', color:'#E8F4F8', dimension:'atmosphere',  exclusive:true,  keywords:['quiet','calm','peaceful','serene','relaxed','still','ruhig','leise','entspannt'] },
  { id:'lively',       label:'Lively',            emoji:'🔊', color:'#FFF0D4', dimension:'atmosphere',  exclusive:true,  keywords:['loud','lively','busy','crowded','noisy','bustling','laut','voll','lebhaft'] },
  // Social fit — additive (can both appear)
  { id:'solo',         label:'Good for solo',     emoji:'🧍', color:'#EDE7F6', dimension:'social',      exclusive:false, keywords:['alone','solo','by myself','on my own','single','alleine','quiet corner'] },
  { id:'social',       label:'Great with others', emoji:'👥', color:'#E3F2FD', dimension:'social',      exclusive:false, keywords:['group','friends','social','people','community','together','meetup','gruppe'] },
  // Environment — additive
  { id:'outdoor',      label:'Outdoors',          emoji:'☀️', color:'#F0F7E6', dimension:'environment', exclusive:false, keywords:['outside','outdoor','garden','park','fresh air','terrace','balcony','open air','draußen','terrasse'] },
  { id:'indoor',       label:'Indoors',           emoji:'🏠', color:'#F5F5F5', dimension:'environment', exclusive:false, keywords:['inside','indoor','cosy','cozy','warm','shelter','drinnen','innen','gemütlich'] },
  // Utility — additive
  { id:'workfriendly', label:'Work-friendly',     emoji:'💻', color:'#E8F5E9', dimension:'utility',     exclusive:false, keywords:['wifi','laptop','work','study','power outlet','steckdose','arbeiten','studieren','wlan'] },
  { id:'weather',      label:'Weather-dependent', emoji:'🌧️', color:'#E1F5FE', dimension:'utility',     exclusive:false, keywords:['rain','weather','sunny','sun','wind','regen','wetter','sommer','winter','outdoor'] },
  { id:'active',       label:'Active',            emoji:'🏃', color:'#FFF8E1', dimension:'utility',     exclusive:false, keywords:['run','swim','exercise','sport','bike','cycle','hike','active','laufen','schwimmen','sport'] },
  { id:'cash_only',    label:'Cash only',         emoji:'💵', color:'#FFF3E0', dimension:'utility',     exclusive:false, keywords:['cash only','cash only','nur bar','barzahlung','kein kartenlesegerät','no card'] },
  { id:'card',         label:'Card payments',     emoji:'💳', color:'#E8EAF6', dimension:'utility',     exclusive:false, keywords:['card','credit','debit','contactless','visa','mastercard','kartenzahlung','ec-karte'] },
  { id:'parking',      label:'Parking nearby',    emoji:'🅿️', color:'#F3E5F5', dimension:'utility',     exclusive:false, keywords:['parking','parkplatz','park nearby','car park','parken','stellplatz'] },
];

const CAT_TAG_DEFAULTS = {
  cafe:      { cost:'cheap',    atmosphere:'quiet',  environment:'indoor',  social:null,     utility:['workfriendly'] },
  park:      { cost:'free',     atmosphere:null,     environment:'outdoor', social:'solo',   utility:['weather','active'] },
  library:   { cost:'free',     atmosphere:'quiet',  environment:'indoor',  social:'solo',   utility:['workfriendly'] },
  museum:    { cost:null,       atmosphere:'quiet',  environment:'indoor',  social:'solo',   utility:[] },
  jobcenter: { cost:'free',     atmosphere:null,     environment:'indoor',  social:'solo',   utility:[] },
  mensa:     { cost:'cheap',    atmosphere:null,     environment:'indoor',  social:null,     utility:[] },
  gym:       { cost:null,       atmosphere:null,     environment:'indoor',  social:'solo',   utility:['active'] },
  pool:      { cost:null,       atmosphere:null,     environment:'outdoor', social:'solo',   utility:['active','weather'] },
};

// ── VIBE MAP ──
const VIBE_MAP = {
  wallet:   { tags: ['free', 'cheap'] },
  myself:   { tags: ['solo', 'quiet'] },
  linkedin: { tags: ['workfriendly'] },
  sun:      { tags: ['outdoor', 'weather'] },
  sweat:    { tags: ['active'] },
  germany:  { type: 'jobcenter' },
  mensa:    { type: 'mensa' },
  wine:     { type: 'bar' },
};

// ── STATE ──
let map, GPlace;
let allPlaces = [], customMarkers = {}, activeVibe = null, searchQuery = '', sheetOpen = false;
let currentPlace = null;
let savedPlaces = JSON.parse(localStorage.getItem('jib_saved') || '[]');
let visitedIds = new Set(JSON.parse(localStorage.getItem('jib_visited') || '[]'));

function persistSaved()   { localStorage.setItem('jib_saved',   JSON.stringify(savedPlaces)); }
function persistVisited() { localStorage.setItem('jib_visited', JSON.stringify([...visitedIds])); }

function isSaved(id) { return savedPlaces.some(p => p.id === id); }

function toggleSave(p) {
  if (!p) return;
  if (isSaved(p.placeId)) {
    savedPlaces = savedPlaces.filter(s => s.id !== p.placeId);
  } else {
    savedPlaces.push({ id: p.placeId, name: p.name, type: p.type,
                       color: p.color, photo: p.photo, address: p.address });
  }
  persistSaved();
  updateSaveButton(p.placeId);
  if (document.getElementById('saved-panel').classList.contains('open')) renderSavedPanel();
}

function toggleVisited(id) {
  visitedIds.has(id) ? visitedIds.delete(id) : visitedIds.add(id);
  persistVisited();
  renderSavedPanel();
}

function updateSaveButton(id) {
  const icon = document.getElementById('d-save-icon');
  if (icon) icon.textContent = isSaved(id) ? '❤️' : '🩶';
}

function openSaved() {
  renderSavedPanel();
  document.getElementById('saved-panel').classList.add('open');
  document.getElementById('saved-backdrop').classList.add('open');
}

function closeSaved() {
  document.getElementById('saved-panel').classList.remove('open');
  document.getElementById('saved-backdrop').classList.remove('open');
}

// Swipe-to-dismiss for saved panel (mobile)
(function() {
  const panel = document.getElementById('saved-panel');
  const handle = document.getElementById('saved-drag-handle');
  let startY = 0, dragging = false;
  function onStart(e) {
    startY = e.touches[0].clientY;
    dragging = true;
    panel.style.transition = 'none';
  }
  function onMove(e) {
    if (!dragging) return;
    const dy = Math.max(0, e.touches[0].clientY - startY);
    panel.style.transform = `translateY(${dy}px)`;
  }
  function onEnd(e) {
    if (!dragging) return;
    dragging = false;
    panel.style.transition = '';
    const dy = e.changedTouches[0].clientY - startY;
    if (dy > 80) { panel.style.transform = ''; closeSaved(); }
    else { panel.style.transform = ''; }
  }
  handle.addEventListener('touchstart', onStart, { passive: true });
  handle.addEventListener('touchmove',  onMove,  { passive: true });
  handle.addEventListener('touchend',   onEnd,   { passive: true });
})();

// Swipe-to-dismiss for info panel (mobile)
(function() {
  const panel = document.getElementById('info-panel');
  const handle = document.getElementById('info-drag-handle');
  let startY = 0, dragging = false;
  function onStart(e) { startY = e.touches[0].clientY; dragging = true; panel.style.transition = 'none'; }
  function onMove(e) {
    if (!dragging) return;
    const dy = Math.max(0, e.touches[0].clientY - startY);
    panel.style.transform = `translateY(${dy}px)`;
  }
  function onEnd(e) {
    if (!dragging) return;
    dragging = false;
    panel.style.transition = '';
    const dy = e.changedTouches[0].clientY - startY;
    if (dy > 80) { panel.style.transform = ''; closeInfo(); }
    else { panel.style.transform = ''; }
  }
  handle.addEventListener('touchstart', onStart, { passive: true });
  handle.addEventListener('touchmove',  onMove,  { passive: true });
  handle.addEventListener('touchend',   onEnd,   { passive: true });
})();

function renderSavedPanel() {
  const list = document.getElementById('saved-list');
  if (!list) return;
  if (savedPlaces.length === 0) {
    list.innerHTML = '<p class="saved-empty">Nothing saved yet.<br>Tap ❤️ on any place to save it.</p>';
    return;
  }
  list.innerHTML = savedPlaces.map(p => {
    const thumb = p.photo
      ? `<img class="saved-card-thumb" src="${p.photo}" alt="${p.name}">`
      : `<div class="saved-card-swatch" style="background:${p.color || '#ccc'}"></div>`;
    return `
      <div class="saved-card" onclick="openPlaceById('${p.id}')">
        ${thumb}
        <div class="saved-card-info">
          <div class="saved-card-name">${p.name}</div>
          <div class="saved-card-addr">${p.address || ''}</div>
        </div>
        <div class="saved-card-actions">
          <button class="unsave-btn" title="Remove from saved" onclick="event.stopPropagation(); unsaveById('${p.id}')">Remove</button>
        </div>
      </div>`;
  }).join('');
}

function unsaveById(id) {
  savedPlaces = savedPlaces.filter(p => p.id !== id);
  persistSaved();
  if (currentPlace && currentPlace.placeId === id) updateSaveButton(id);
  renderSavedPanel();
}

function openPlaceById(id) {
  closeSaved();
  const place = allPlaces.find(p => p.placeId === id);
  if (place) openDetail(place);
}
let searchCenter = { lat: ALEX.lat, lng: ALEX.lng }; // where the next search is centered
let lastSearchCenter = null;                          // where results were last loaded
let fetching = false, idleTimer = null;

// ── HELPERS ──
function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function starStr(n) { return '★'.repeat(Math.floor(n)) + (n % 1 >= 0.5 ? '½' : ''); }

function showLoader(v) { document.getElementById('loader').style.display = v ? 'block' : 'none'; }

// Distance in metres between two {lat,lng} points (haversine)
function distMeters(a, b) {
  const R = 6371000, toRad = d => d * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng);
  const s = Math.sin(dLat/2)**2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// ── LAYOUT: position #cats and #map-controls below the topbar dynamically ──
function openInfo() {
  document.getElementById('info-panel').classList.add('open');
  document.getElementById('info-backdrop').classList.add('open');
}
function closeInfo() {
  document.getElementById('info-panel').classList.remove('open');
  document.getElementById('info-backdrop').classList.remove('open');
}

function toggleDarkMode() {
  const dark = document.body.classList.toggle('dark');
  document.getElementById('dark-toggle').textContent = dark ? '☀️' : '🌙';
  if (map) map.setOptions({ styles: dark ? MAP_STYLES_DARK : MAP_STYLES_LIGHT });
}

function updateLayout() {
  const topbarH  = document.getElementById('topbar').offsetHeight;
  const cats     = document.getElementById('cats');
  const controls = document.getElementById('map-controls');
  cats.style.top = topbarH + 'px';
  const catsH    = cats.offsetHeight;
  const navH = topbarH + catsH;
  controls.style.top = (navH + 12) + 'px';
  // --nav-height drives the expanded sheet height so it reaches up to (not under) the nav
  document.documentElement.style.setProperty('--nav-height', (topbarH + catsH) + 'px');
}
window.addEventListener('resize', updateLayout);
// Run after DOM ready, after first paint, and after fonts load — covers all timing edge cases
document.addEventListener('DOMContentLoaded', () => {
  updateLayout();
  requestAnimationFrame(updateLayout);

  // Convert vertical mouse-wheel to horizontal scroll on the pills row (desktop)
  const vibesEl = document.getElementById('vibes-scroll');
  vibesEl.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      vibesEl.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  // Show/hide the › and ‹ arrows based on scroll position
  function updateVibesArrow() {
    const btnNext = document.getElementById('vibes-next');
    const fadeRight = document.getElementById('vibes-fade');
    const btnPrev = document.getElementById('vibes-prev');
    const fadeLeft = document.getElementById('vibes-fade-left');
    if (!btnNext || !fadeRight) return;
    const overflows = vibesEl.scrollWidth > vibesEl.clientWidth + 4;
    const atEnd = vibesEl.scrollLeft + vibesEl.clientWidth >= vibesEl.scrollWidth - 4;
    const atStart = vibesEl.scrollLeft <= 4;
    const showRight = overflows && !atEnd;
    const showLeft = overflows && !atStart;
    fadeRight.style.display = showRight ? 'flex' : 'none';
    btnNext.style.display = showRight ? 'flex' : 'none';
    if (fadeLeft && btnPrev) {
      fadeLeft.style.display = showLeft ? 'flex' : 'none';
      btnPrev.style.display = showLeft ? 'flex' : 'none';
    }
  }
  vibesEl.addEventListener('scroll', updateVibesArrow);
  window.addEventListener('resize', updateVibesArrow);
  requestAnimationFrame(updateVibesArrow);
  setTimeout(updateVibesArrow, 300);
});
document.fonts.ready.then(updateLayout);

// ── GOOGLE MAPS INIT ──
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { Place } = await google.maps.importLibrary("places");
  GPlace = Place;

  map = new Map(document.getElementById('map'), {
    center: ALEX,
    zoom: 9,
    restriction: {
      // Fence the whole viewport to Berlin + the surrounding state of Brandenburg.
      latLngBounds: { north: 53.6, south: 51.3, west: 11.2, east: 14.8 },
      strictBounds: true,
    },
    disableDefaultUI: true,
    styles: MAP_STYLES_LIGHT,
  });

  // Custom HTML marker class
  window.BlobMarker = class extends google.maps.OverlayView {
    constructor(position, html, onClick) {
      super();
      this.pos = new google.maps.LatLng(position.lat, position.lng);
      this.html = html;
      this.onClick = onClick;
      this.div = null;
      this.visible = true;   // remembered even if set before the div is drawn
    }
    onAdd() {
      this.div = document.createElement('div');
      this.div.style.cssText = 'position:absolute;cursor:pointer;';
      this.div.style.display = this.visible ? '' : 'none';   // honor filter set pre-draw
      this.div.innerHTML = this.html;
      if (this.onClick) this.div.addEventListener('click', this.onClick);
      this.getPanes().overlayMouseTarget.appendChild(this.div);
    }
    draw() {
      const pt = this.getProjection().fromLatLngToDivPixel(this.pos);
      if (pt && this.div) {
        this.div.style.left = (pt.x - 23) + 'px';
        this.div.style.top  = (pt.y - 23) + 'px';
      }
    }
    onRemove() {
      if (this.div?.parentNode) this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
    setVisible(v) { this.visible = v; if (this.div) this.div.style.display = v ? '' : 'none'; }
  };

  // Re-search when the map settles after a pan/zoom, if moved far enough
  map.addListener('idle', () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(maybeRefetch, 700);
  });

  useFallback();           // instant content
  await locateUser();      // center search on the user (waits up to 8s, else Alexanderplatz)
  fetchFromPlaces();       // live results around the user
}

// Reload places when the user has navigated far from the last search center
function maybeRefetch() {
  if (fetching || !lastSearchCenter) return;       // skip during a fetch or before first load
  const c = map.getCenter();
  if (!c) return;
  const center = { lat: c.lat(), lng: c.lng() };
  if (distMeters(center, lastSearchCenter) < 2500) return;  // not far enough to bother
  searchCenter = center;
  fetchFromPlaces(true);
}

// ── USER LOCATION ──
// Search is centered here; defaults to Alexanderplatz until geolocation resolves.
let userLoc = { lat: ALEX.lat, lng: ALEX.lng };

// Berlin city limits (generous). Used to decide if the visitor is actually in
// Berlin — only then do we center on them. Outside this, we show all of Berlin.
const BERLIN_BOUNDS = { north: 52.68, south: 52.34, west: 13.08, east: 13.77 };
function inBerlin(lat, lng) {
  return lat >= BERLIN_BOUNDS.south && lat <= BERLIN_BOUNDS.north
      && lng >= BERLIN_BOUNDS.west  && lng <= BERLIN_BOUNDS.east;
}

// Animated zoom-in: pan to a point, then step the zoom up one level at a time so
// the move is visible (raster maps don't tween setZoom, so we fake the glide).
function flyTo(center, targetZoom) {
  map.panTo(center);
  let z = map.getZoom();
  const step = () => {
    if (z >= targetZoom) return;
    z += 1;
    map.setZoom(z);
    if (z < targetZoom) setTimeout(step, 140);
  };
  setTimeout(step, 250); // let the pan begin first
}

// Visitor is not in Berlin (or location failed): show the whole city, search Berlin.
function showBerlinOverview() {
  searchCenter = { lat: ALEX.lat, lng: ALEX.lng };
  flyTo({ lat: ALEX.lat, lng: ALEX.lng }, 12);
  const lbl = document.querySelector('.sheet-label');
  if (lbl) lbl.textContent = 'Around Berlin';
}

function locateUser() {
  return new Promise(resolve => {
    if (!navigator.geolocation) { showBerlinOverview(); resolve(); return; }
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      // Only follow the visitor's location when they're actually in Berlin.
      if (!inBerlin(lat, lng)) { showBerlinOverview(); resolve(); return; }
      userLoc = { lat, lng };
      searchCenter = { lat, lng };
      const youEl = document.createElement('div');
      youEl.innerHTML = `
        <div style="position:relative;width:18px;height:18px;">
          <div style="position:absolute;inset:-8px;border-radius:50%;background:rgba(67,97,238,0.15);animation:pulse 2s ease-out infinite;"></div>
          <div style="width:18px;height:18px;border-radius:50%;background:#4361EE;border:3px solid #fff;box-shadow:0 0 0 4px rgba(67,97,238,0.3),2px 2px 0 #111;"></div>
        </div>`;
      const youMarker = new window.BlobMarker({ lat, lng }, youEl.innerHTML, null);
      youMarker.setMap(map);
      flyTo({ lat, lng }, 14);
      resolve();
    }, () => { showBerlinOverview(); resolve(); }, { enableHighAccuracy: true, timeout: 8000 });
  });
}

// ── PLACES API FETCH (new Places API) ──
const SEARCH_CONFIGS = [
  { type: 'cafe',      includedTypes: ['cafe'] },
  { type: 'park',      includedTypes: ['park'] },
  { type: 'library',   includedTypes: ['library'] },
  { type: 'museum',    includedTypes: ['museum'] },
  { type: 'jobcenter', textQuery: 'Jobcenter Berlin' },
  { type: 'mensa',     textQuery: 'Mensa Berlin' },
  { type: 'mensa',     textQuery: 'Studierendenwerk Berlin Mensa' },
  { type: 'gym',       includedTypes: ['gym', 'fitness_center'] },
  { type: 'pool',      includedTypes: ['swimming_pool'] },
  { type: 'pool',      textQuery: 'Badesee Berlin' },
  { type: 'bar',       includedTypes: ['bar'] },
  { type: 'bar',       textQuery: 'Kneipe Berlin' },
  { type: 'jobcenter', textQuery: 'Volkshochschule Berlin' },
  { type: 'jobcenter', textQuery: 'Berufsschule Ausbildung Berlin' },
  { type: 'jobcenter', includedTypes: ['language_school'] },
];

const PLACE_FIELDS = ['displayName','location','rating','photos',
                      'regularOpeningHours','formattedAddress',
                      'userRatingCount','id',
                      'priceLevel','paymentOptions','types'];

const EXCLUDED_PLACE_TYPES = ['lodging', 'hotel', 'motel', 'resort_hotel', 'bed_and_breakfast', 'extended_stay_hotel', 'hostel', 'spa'];

async function searchCategory(cfg) {
  try {
    let places;
    const center = new google.maps.LatLng(searchCenter.lat, searchCenter.lng);
    if (cfg.includedTypes) {
      const r = await GPlace.searchNearby({
        fields: PLACE_FIELDS,
        locationRestriction: { center, radius: RADIUS },
        includedTypes: cfg.includedTypes,
        excludedTypes: EXCLUDED_PLACE_TYPES,
        maxResultCount: 20,
        rankPreference: google.maps.places.SearchNearbyRankPreference.DISTANCE,
        language: 'en-US', region: 'DE',
      });
      places = r.places;
    } else {
      const r = await GPlace.searchByText({
        fields: PLACE_FIELDS,
        textQuery: cfg.textQuery,
        locationBias: { center, radius: RADIUS },
        maxResultCount: 20,
        language: 'en-US', region: 'DE',
      });
      places = r.places;
    }
    const filtered = (places || []).filter(p => {
      if (!p) return false;
      const t = Array.isArray(p.types) ? p.types : [];
      return !t.some(pt => EXCLUDED_PLACE_TYPES.includes(pt));
    });
    return filtered.map(p => { const pl = convertPlace(p, cfg.type); computeTags(pl); return pl; });
  } catch(e) { console.error('Places search failed for', cfg.type, ':', e?.message || e); return []; }
}

function convertPlace(place, type) {
  const lat = place.location.lat();
  const lng = place.location.lng();
  const photo = place.photos?.[0]?.getURI?.({ maxWidth: 800 }) || place.photos?.[0]?.getUrl?.({ maxWidth: 800 }) || null;
  const hash  = hashStr(place.id);
  const isOpen = typeof place.regularOpeningHours?.isOpen === 'function' ? place.regularOpeningHours.isOpen() : null;
  const hours = place.regularOpeningHours?.weekdayDescriptions || [];
  return {
    id: place.id, placeId: place.id,
    type, name: place.displayName,
    lat, lng,
    color: CAT_COLOR[type],
    desc: DESCS[type][hash % DESCS[type].length],
    stars: place.rating || parseFloat((4.3 + Math.random() * 0.6).toFixed(1)),
    ratingCount: place.userRatingCount || Math.floor(Math.random() * 800 + 80),
    photo,
    hoursObj: isOpen !== null ? { isOpen, lines: hours } : null,
    address: place.formattedAddress || 'Berlin, Germany',
    reviews: [],
    detailLoaded: false,
    gmUrl: place.googleMapsURI || `https://www.google.com/maps/place/?q=place_id:${place.id}`,
    priceLevel: place.priceLevel || null,
    paymentOptions: place.paymentOptions || null,
    tags: [],
  };
}

async function fetchFromPlaces(isRefetch = false) {
  fetching = true;
  showLoader(true);
  const mapDiv = map?.getDiv();

  if (isRefetch && mapDiv) mapDiv.classList.add('map-loading');

  try {
    const accum = [], seen = new Set();
    let renderTimer = null;
    const scheduleRender = () => {
      clearTimeout(renderTimer);
      renderTimer = setTimeout(() => {
        allPlaces = accum.slice();
        syncMarkers();
        applyFilters();
      }, 120);
    };

    await Promise.all(SEARCH_CONFIGS.map(async cfg => {
      const ps = await searchCategory(cfg);
      ps.forEach(p => { if (!seen.has(p.id)) { seen.add(p.id); accum.push(p); } });
      if (ps.length) scheduleRender();
    }));

    // Final render after all categories done
    clearTimeout(renderTimer);
    if (accum.length) {
      allPlaces = accum.slice();
      syncMarkers();
      applyFilters();
    }
    lastSearchCenter = { ...searchCenter };
  } catch(e) { /* keep fallback */ }

  if (mapDiv) mapDiv.classList.remove('map-loading');
  showLoader(false);
  fetching = false;
}

// ── FALLBACK DATA (shown instantly while Places API loads) ──
function useFallback() {
  const fb = [
    { id:'fb1',  type:'cafe',      name:'Bonanza Coffee Heroes',        lat:52.5343, lng:13.4226, address:'Oderberger Straße 35, Berlin',         isOpen:null },
    { id:'fb2',  type:'cafe',      name:'The Barn Roastery',            lat:52.5285, lng:13.4102, address:'Schönhauser Allee 178b, Berlin',        isOpen:null },
    { id:'fb3',  type:'cafe',      name:'Five Elephant',                lat:52.4994, lng:13.4207, address:'Reichenberger Str. 101, Berlin',        isOpen:null },
    { id:'fb4',  type:'cafe',      name:'Café Anna Blume',              lat:52.5386, lng:13.4179, address:'Kollwitzstraße 83, Berlin',             isOpen:null },
    { id:'fb5',  type:'cafe',      name:'Roamers',                      lat:52.4896, lng:13.4251, address:'Pannierstraße 64, Berlin',              isOpen:null },
    { id:'fb6',  type:'cafe',      name:'Father Carpenter',             lat:52.5230, lng:13.4010, address:'Münzstraße 21, Berlin',                isOpen:null },
    { id:'fb11', type:'park',      name:'Tiergarten',                   lat:52.5145, lng:13.3501, address:'Berlin',                               isOpen:true  },
    { id:'fb12', type:'park',      name:'Volkspark Friedrichshain',     lat:52.5267, lng:13.4528, address:'Berlin',                               isOpen:true  },
    { id:'fb13', type:'park',      name:'Mauerpark',                    lat:52.5406, lng:13.4012, address:'Berlin',                               isOpen:true  },
    { id:'fb14', type:'park',      name:'Treptower Park',               lat:52.4895, lng:13.4690, address:'Berlin',                               isOpen:true  },
    { id:'fb21', type:'library',   name:'Amerika Gedenkbibliothek',     lat:52.4983, lng:13.3878, address:'Blücherplatz 1, Berlin',               isOpen:null },
    { id:'fb22', type:'library',   name:'Staatsbibliothek zu Berlin',   lat:52.5083, lng:13.3692, address:'Potsdamer Str. 33, Berlin',            isOpen:null },
    { id:'fb31', type:'museum',    name:'Topographie des Terrors',      lat:52.5063, lng:13.3812, address:'Niederkirchnerstr. 8, Berlin',         isOpen:null },
    { id:'fb32', type:'museum',    name:'Hamburger Bahnhof',            lat:52.5252, lng:13.3665, address:'Invalidenstr. 50, Berlin',             isOpen:null },
    { id:'fb41', type:'jobcenter', name:'Jobcenter Berlin Mitte',       lat:52.5197, lng:13.3842, address:'Müllerstr. 178, Berlin',               isOpen:null },
    { id:'fb42', type:'jobcenter', name:'Agentur für Arbeit Berlin',    lat:52.5323, lng:13.3823, address:'Charlottenstr. 90, Berlin',            isOpen:null },
    { id:'fb51', type:'mensa',     name:'Mensa TU Berlin',              lat:52.5122, lng:13.3267, address:'Hardenbergstr. 34, Berlin',            isOpen:null },
    { id:'fb52', type:'mensa',     name:'Mensa HU Berlin',              lat:52.5190, lng:13.3928, address:'Unter den Linden 6, Berlin',           isOpen:null },
    { id:'fb53', type:'mensa',     name:'Mensa FU Berlin (Silberlaube)', lat:52.4571, lng:13.2960, address:'Habelschwerdter Allee 45, Berlin',     isOpen:null },
    { id:'fb54', type:'mensa',     name:'Mensa HTW Berlin',             lat:52.4573, lng:13.5257, address:'Treskowallee 8, Berlin',               isOpen:null },
    { id:'fb55', type:'mensa',     name:'Mensa Beuth / BHT Berlin',     lat:52.5419, lng:13.3529, address:'Luxemburger Str. 10, Berlin',          isOpen:null },
    { id:'fb56', type:'mensa',     name:'Mensa UdK Berlin',             lat:52.5027, lng:13.3280, address:'Hardenbergstr. 33, Berlin',            isOpen:null },
    { id:'fb57', type:'mensa',     name:'Mensa HWR Berlin',             lat:52.4960, lng:13.3890, address:'Badensche Str. 50–51, Berlin',         isOpen:null },
    { id:'fb61', type:'gym',       name:'Fitness First Berlin Mitte',   lat:52.5230, lng:13.4010, address:'Rosenthaler Str. 51, Berlin',          isOpen:null },
    { id:'fb62', type:'gym',       name:'McFit Alexanderplatz',         lat:52.5219, lng:13.4140, address:'Alexanderplatz, Berlin',               isOpen:null },
    { id:'fb71', type:'pool',      name:'Stadtbad Mitte',               lat:52.5300, lng:13.3870, address:'Gartenstr. 5, Berlin',                 isOpen:null },
    { id:'fb72', type:'pool',      name:'Schlachtensee (Badesee)',      lat:52.4380, lng:13.2030, address:'Berlin',                              isOpen:true  },
    { id:'fb73', type:'pool',      name:'Sommerbad Kreuzberg',          lat:52.4920, lng:13.4030, address:'Prinzenstr. 113, Berlin',             isOpen:null },
  ];
  allPlaces = fb.map(p => {
    const hash  = hashStr(p.id);
    const color = CAT_COLOR[p.type];
    const desc  = DESCS[p.type][hash % DESCS[p.type].length];
    const stars = parseFloat((4.3 + Math.random() * 0.6).toFixed(1));
    return {
      ...p, color, desc, stars,
      isFallback: true,
      ratingCount: Math.floor(Math.random() * 800 + 80),
      photo: null,
      hoursObj: p.isOpen !== null ? { isOpen: p.isOpen, lines: [] } : null,
      reviews: [],
      detailLoaded: false,
      gmUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ' Berlin')}`,
      priceLevel: null, paymentOptions: null,
      tags: [],
    };
  });
  allPlaces.forEach(computeTags);
  renderAll();
}

// ── MARKERS ──
function markerHTML(p) {
  const blob = BLOBS[hashStr(p.id) % BLOBS.length];
  const icon = TYPE_ICONS[p.type] || TYPE_ICONS.cafe;
  return `<div class="map-blob" style="background:${p.color};width:46px;height:46px;${blob};border:2.5px solid #111;box-shadow:3px 3px 0 #111;display:flex;align-items:center;justify-content:center;">${icon}</div>`;
}

// Add/remove only what changed so existing pins stay put (no flash);
// new pins animate in via the .map-blob pop.
function syncMarkers() {
  const ids = new Set(allPlaces.map(p => p.id));
  Object.keys(customMarkers).forEach(id => {
    if (!ids.has(id)) { customMarkers[id].setMap(null); delete customMarkers[id]; }
  });
  allPlaces.forEach(p => {
    if (customMarkers[p.id]) return;
    const m = new window.BlobMarker({ lat: p.lat, lng: p.lng }, markerHTML(p), () => {
      scrollToCard(p.id);
      openDetail(p);
    });
    m.setMap(map);
    customMarkers[p.id] = m;
  });
}

// ── CARDS ──
function buildCards(filter) {
  const el = document.getElementById('cards');
  // Accept either an array of places or a legacy filter string
  const list = Array.isArray(filter) ? filter
    : (filter === 'all' ? allPlaces : allPlaces.filter(p => p.type === filter));
  if (!list.length) { el.innerHTML = '<p style="padding:12px 4px;font-size:13px;color:#888;font-weight:600;">No places found</p>'; return; }
  // Build into a fragment first, then swap in one atomic operation — no empty flash
  const frag = document.createDocumentFragment();

  list.forEach((p, i) => {
    const blob = BLOBS[hashStr(p.id) % BLOBS.length];
    const card = document.createElement('div');
    card.id = `card-${p.id}`;
    card.className = 'place-card fade-up';
    card.style.animationDelay = `${Math.min(i, 10) * 0.03}s`;

    const statusHTML = p.hoursObj
      ? `<span class="card-status ${p.hoursObj.isOpen ? 'open' : 'closed'}">${p.hoursObj.isOpen ? '● Open' : '● Closed'}</span>`
      : `<span class="card-status" style="color:rgba(255,255,255,0.5)">● N/A</span>`;

    const icon = TYPE_ICONS[p.type] || TYPE_ICONS.cafe;
    // No photo → show the category icon on the category color. If a photo fails
    // to load, onerror removes it and the icon underneath shows through.
    card.style.background = p.color;
    const imgTag = p.photo
      ? `<img class="card-photo" src="${p.photo}" alt="${p.name}" loading="lazy" onerror="this.remove()"/>`
      : '';
    const cornerBlob = '';

    card.innerHTML = `
      <div class="card-fallback-icon">${icon}</div>
      ${imgTag}
      <div class="card-overlay"></div>
      ${cornerBlob}
      <div class="card-content">
        <div class="card-name">${p.name}</div>
        <div class="card-stars">${starStr(p.stars)} ${p.stars}</div>
        ${statusHTML}
      </div>`;

    card.addEventListener('click', () => {
      if (map) { map.panTo({ lat: p.lat, lng: p.lng }); map.setZoom(16); }
      openDetail(p);
    });
    frag.appendChild(card);
  });
  // Atomic swap — replaceChildren swaps old and new in a single DOM operation, no empty-frame flash
  el.replaceChildren(frag);
}

function scrollToCard(id) {
  const c = document.getElementById(`card-${id}`);
  if (c) c.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

// ── FILTER ──
function matchesFilters(p) {
  // Search takes priority — matches name, address, or type
  if (searchQuery) {
    const q = searchQuery;
    return p.name.toLowerCase().includes(q)
        || (p.address || '').toLowerCase().includes(q)
        || (p.type || '').toLowerCase().includes(q);
  }
  // Vibe filter
  if (!activeVibe) return true;
  // Don't include hardcoded fallback places in vibe results — their locations
  // are fixed Berlin landmarks and may be far from the user's actual location.
  if (p.isFallback) return false;
  const v = VIBE_MAP[activeVibe];
  if (v.type) return p.type === v.type;
  return v.tags.some(tagId => p.tags.some(t => t.id === tagId));
}

function openSearch() {
  searchQuery = '';
  // Clear active vibe — search and vibe are mutually exclusive
  activeVibe = null;
  document.querySelectorAll('.vibe-pill').forEach(b => b.classList.remove('active'));
  // Show search bar at the same top position as #cats
  const cats = document.getElementById('cats');
  const searchBar = document.getElementById('search-bar');
  searchBar.style.top = cats.style.top;
  cats.style.visibility = 'hidden';   // hide pills row so it doesn't show through under the search bar
  searchBar.classList.add('open');
  document.getElementById('search-input').focus();
  applyFilters();
}

function closeSearch() {
  searchQuery = '';
  document.getElementById('search-input').value = '';
  document.getElementById('search-bar').classList.remove('open');
  document.getElementById('cats').style.visibility = '';   // restore pills row
  applyFilters();
}

document.getElementById('search-input').addEventListener('input', e => {
  searchQuery = e.target.value.trim().toLowerCase();
  applyFilters();
});

// Close search on Escape key
document.getElementById('search-input').addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSearch();
});

function setVibe(vibeId) {
  // Close search if open — vibe and search are mutually exclusive
  if (searchQuery || document.getElementById('search-bar').classList.contains('open')) {
    searchQuery = '';
    document.getElementById('search-input').value = '';
    document.getElementById('search-bar').classList.remove('open');
  }
  // "All" pill clears any filter; other pills toggle (tap again to deselect)
  if (vibeId === 'all') {
    activeVibe = null;
  } else {
    activeVibe = activeVibe === vibeId ? null : vibeId;
  }

  let activePill = null;
  document.querySelectorAll('.vibe-pill').forEach(btn => {
    // "All" is active whenever no vibe is selected; otherwise match the active vibe
    const on = btn.dataset.vibe === 'all' ? activeVibe === null : btn.dataset.vibe === activeVibe;
    btn.classList.toggle('active', on);
    if (on) activePill = btn;
  });

  // Scroll the active pill into view if it's clipped by the scroll container
  if (activePill) {
    activePill.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
  }

  applyFilters(); // markers + cards update; map stays where the user is
}

function applyFilters(fitMap = false) {
  const visible = allPlaces.filter(matchesFilters);

  // Show/hide markers
  Object.entries(customMarkers).forEach(([id, m]) => {
    m.setVisible(!!visible.find(p => p.id === id));
  });

  // Rebuild cards
  buildCards(visible);

  // Only fit map bounds when user explicitly selects a vibe, not on data refresh
  if (fitMap && visible.length > 1 && map) {
    const bounds = new google.maps.LatLngBounds();
    visible.forEach(p => bounds.extend({ lat: p.lat, lng: p.lng }));
    map.fitBounds(bounds, 80);
  }
}

// ── SHEET ──
function expandSheet() { document.getElementById('sheet').classList.remove('collapsed'); sheetOpen = true; }
function collapseSheet() { document.getElementById('sheet').classList.add('collapsed'); sheetOpen = false; }

(function setupSheetHandle() {
  const handle = document.getElementById('sheet-handle');
  const sheet  = document.getElementById('sheet');
  let startY = 0, deltaY = 0, dragging = false;

  // Desktop: click toggle (only fires if not a drag)
  handle.addEventListener('click', () => {
    if (dragging) return;
    sheetOpen ? collapseSheet() : expandSheet();
  });

  // Desktop: mouse drag
  handle.addEventListener('mousedown', e => {
    startY   = e.clientY;
    deltaY   = 0;
    dragging = false;
    sheet.style.transition = 'none';
    handle.style.cursor = 'grabbing';

    function onMouseMove(e) {
      deltaY = e.clientY - startY;
      if (Math.abs(deltaY) > 6) dragging = true;
      if (!dragging) return;
      const baseOffset = sheetOpen ? 0 : (sheet.offsetHeight - 148);
      const clamped = Math.max(0, Math.min(sheet.offsetHeight - 148, baseOffset + deltaY));
      sheet.style.transform = `translateY(${clamped}px)`;
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      sheet.style.transition = '';
      sheet.style.transform  = '';
      handle.style.cursor    = '';
      if (!dragging) return; // let click handler take it
      if      (deltaY < -40) expandSheet();
      else if (deltaY >  40) collapseSheet();
      else    sheetOpen ? expandSheet() : collapseSheet();
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',  onMouseUp);
  });

  handle.addEventListener('touchstart', e => {
    startY  = e.touches[0].clientY;
    deltaY  = 0;
    dragging = false;
    // Freeze the sheet at its current visual position so we can drag from there
    sheet.style.transition = 'none';
  }, { passive: true });

  handle.addEventListener('touchmove', e => {
    deltaY = e.touches[0].clientY - startY;
    if (Math.abs(deltaY) > 6) dragging = true;
    if (!dragging) return;

    // Move sheet live with the finger.
    // Collapsed base = translateY(calc(100% - 148px)), expanded = translateY(0)
    // We offset from whichever state we're currently in.
    const baseOffset = sheetOpen ? 0 : (sheet.offsetHeight - 148);
    const raw = baseOffset + deltaY;
    // Clamp: can't go above fully expanded (0) or below fully collapsed
    const clamped = Math.max(0, Math.min(sheet.offsetHeight - 148, raw));
    sheet.style.transform = `translateY(${clamped}px)`;
  }, { passive: true });

  handle.addEventListener('touchend', () => {
    sheet.style.transition = '';
    sheet.style.transform  = '';

    if (!dragging) {
      // Tiny tap — toggle
      sheetOpen ? collapseSheet() : expandSheet();
      return;
    }
    dragging = false;

    // Snap: dragged up enough → expand; down enough → collapse; else stay
    if      (deltaY < -40) expandSheet();
    else if (deltaY >  40) collapseSheet();
    else    sheetOpen ? expandSheet() : collapseSheet(); // snap back to current state
  });
})();

// ── DETAIL SWIPE-TO-DISMISS (mobile) ──
(function setupDetailSwipe() {
  const detail = document.getElementById('detail');
  const dragHandle = document.getElementById('detail-handle');
  let startY = 0, deltaY = 0, dragging = false;

  function onStart(clientY) { startY = clientY; deltaY = 0; dragging = false; }
  function onMove(clientY) {
    deltaY = clientY - startY;
    if (Math.abs(deltaY) > 8) dragging = true;
    if (dragging && deltaY > 0) {
      detail.style.transform = `translateY(${deltaY}px)`;
      detail.style.transition = 'none';
    }
  }
  function onEnd() {
    detail.style.transition = '';
    detail.style.transform = '';
    if (dragging && deltaY > 80) closeDetail();
    dragging = false;
  }

  dragHandle.addEventListener('touchstart', e => onStart(e.touches[0].clientY), { passive: true });
  dragHandle.addEventListener('touchmove',  e => { e.preventDefault(); onMove(e.touches[0].clientY); }, { passive: false });
  dragHandle.addEventListener('touchend',   onEnd);
})();

// ── SCROLL BUTTONS ──
(function setupScrollButtons() {
  const cards   = document.getElementById('cards');
  const btnPrev = document.getElementById('cards-prev');
  const btnNext = document.getElementById('cards-next');

  function updateButtons() {
    btnPrev.classList.toggle('hidden', cards.scrollLeft <= 10);
    btnNext.classList.toggle('hidden', cards.scrollLeft + cards.clientWidth >= cards.scrollWidth - 10);
  }

  btnPrev.addEventListener('click', () => { cards.scrollBy({ left: -300, behavior: 'smooth' }); });
  btnNext.addEventListener('click', () => { cards.scrollBy({ left:  300, behavior: 'smooth' }); });
  cards.addEventListener('scroll', updateButtons, { passive: true });

  // Also update whenever cards are rebuilt
  const origBuildCards = buildCards;
  window.buildCards = function(...args) { origBuildCards(...args); requestAnimationFrame(updateButtons); };

  // Drag-to-scroll with mouse (desktop)
  let isDragging = false, dragStartX = 0, dragScrollLeft = 0, didDrag = false;
  cards.addEventListener('mousedown', e => {
    isDragging = true; didDrag = false;
    dragStartX = e.pageX - cards.offsetLeft;
    dragScrollLeft = cards.scrollLeft;
    cards.style.cursor = 'grabbing';
    cards.style.userSelect = 'none';
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.pageX - cards.offsetLeft - dragStartX;
    if (Math.abs(dx) > 4) didDrag = true;
    cards.scrollLeft = dragScrollLeft - dx;
  });
  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    cards.style.cursor = '';
    cards.style.userSelect = '';
  });
  // Prevent card click from firing after a drag
  cards.addEventListener('click', e => { if (didDrag) { e.stopPropagation(); didDrag = false; } }, true);
})();

// ── DETAIL ──
async function openDetail(p) {
  // Navigating away from search to view a place — reset search so it starts fresh next time
  if (document.getElementById('search-bar').classList.contains('open')) closeSearch();

  // Render basic info immediately
  const photoEl = document.getElementById('d-photo');
  photoEl.style.display = p.photo ? 'block' : 'none';   // no photo → show color hero
  if (p.photo) photoEl.src = p.photo;
  photoEl.alt = p.name;
  document.getElementById('d-hero').style.background = p.color;
  document.getElementById('d-name').textContent = p.name;
  document.getElementById('d-stars').textContent = starStr(p.stars);
  document.getElementById('d-rating').textContent = `${p.stars} · ${p.ratingCount} reviews`;
  document.getElementById('d-desc').textContent = p.desc;
  document.getElementById('d-address-text').textContent = p.address;
  document.getElementById('d-gmaps').href = p.gmUrl || '#';

  currentPlace = p;
  updateSaveButton(p.placeId);

  const statusEl = document.getElementById('d-status');
  if (p.hoursObj) {
    statusEl.textContent = p.hoursObj.isOpen ? '● Open now' : '● Closed';
    statusEl.className = `status-pill ${p.hoursObj.isOpen ? 'open' : 'closed'}`;
    renderHours(p.hoursObj.lines);
  } else {
    statusEl.textContent = 'Hours unknown';
    statusEl.className = 'status-pill unknown';
    document.getElementById('d-hours-block').style.display = 'none';
  }

  renderTags(deriveTagsFromReviews(p.reviews, p.type, p));
  document.getElementById('detail').classList.add('open');
  document.getElementById('detail-backdrop').classList.add('open');
  document.body.classList.add('detail-open');

  // Fetch full details from Places API if not already loaded
  if (!p.detailLoaded && p.placeId && !p.placeId.startsWith('fb')) {
    try {
      const place = new GPlace({ id: p.placeId });
      await place.fetchFields({
        fields: ['displayName','rating','userRatingCount','photos','reviews',
                 'regularOpeningHours','formattedAddress','googleMapsURI'],
      });

      if (place.photos?.length > 0) {
        p.photo = place.photos[0].getURI({ maxWidth: 800 });
        photoEl.src = p.photo;
        photoEl.style.display = 'block';
      }
      if (place.googleMapsURI) {
        p.gmUrl = place.googleMapsURI;
        document.getElementById('d-gmaps').href = p.gmUrl;
      }
      if (place.formattedAddress) {
        p.address = place.formattedAddress;
        document.getElementById('d-address-text').textContent = p.address;
      }
      if (place.regularOpeningHours) {
        p.hoursObj = {
          isOpen: typeof place.regularOpeningHours.isOpen === 'function' ? place.regularOpeningHours.isOpen() : null,
          lines: place.regularOpeningHours.weekdayDescriptions || [],
        };
        statusEl.textContent = p.hoursObj.isOpen ? '● Open now' : '● Closed';
        statusEl.className = `status-pill ${p.hoursObj.isOpen ? 'open' : 'closed'}`;
        renderHours(p.hoursObj.lines);
      }
      if (place.reviews?.length > 0) {
        p.reviews = place.reviews.slice(0, 3).map(r => ({
          name: r.authorAttribution?.displayName || 'Anonymous',
          avatar: (r.authorAttribution?.displayName || 'A')[0],
          text: (typeof r.text === 'string' ? r.text : r.text?.text) || '',
          stars: r.rating,
        }));
        computeTags(p); // update stored tags with real reviews
        renderTags(deriveTagsFromReviews(p.reviews, p.type, p));
      }
      if (place.rating) {
        p.stars = place.rating;
        p.ratingCount = place.userRatingCount || p.ratingCount;
        document.getElementById('d-stars').textContent = starStr(p.stars);
        document.getElementById('d-rating').textContent = `${p.stars} · ${p.ratingCount} reviews`;
      }
      p.detailLoaded = true;
    } catch(e) { console.error('Detail fetch failed for', p.name, ':', e?.message || e); }
  }
}

function renderHours(lines) {
  const block = document.getElementById('d-hours-block');
  if (!lines?.length) { block.style.display = 'none'; return; }
  block.style.display = 'block';
  const list = document.getElementById('d-hours-list');
  list.innerHTML = lines.map(l => `<div class="hours-line">${l}</div>`).join('');
  list.style.display = 'none';                                 // start collapsed
  document.getElementById('d-hours-chevron').style.transform = 'rotate(0deg)';
}

document.getElementById('d-hours-toggle').addEventListener('click', () => {
  const list = document.getElementById('d-hours-list');
  const chevron = document.getElementById('d-hours-chevron');
  const open = list.style.display !== 'none';
  list.style.display = open ? 'none' : 'block';
  chevron.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
});

function deriveTagsFromReviews(reviews, type, placeData = {}) {
  const byId = Object.fromEntries(TAG_DEFS.map(t => [t.id, t]));
  const defaults = CAT_TAG_DEFAULTS[type] || {};

  // ── TIER 1: Official API fields — confirmed facts, override everything ──
  const tier1 = {}; // dimension → tagId
  const tier1Utility = new Set(); // utility tags forced by API
  const { priceLevel, paymentOptions } = placeData;
  if (priceLevel === 'FREE')                        tier1.cost = 'free';
  else if (priceLevel === 'INEXPENSIVE')            tier1.cost = 'cheap';
  else if (priceLevel === 'EXPENSIVE' || priceLevel === 'VERY_EXPENSIVE') tier1.cost = 'expensive';
  if (paymentOptions?.acceptsCashOnly)              tier1Utility.add('cash_only');
  if (paymentOptions?.acceptsCreditCards || paymentOptions?.acceptsDebitCards) tier1Utility.add('card');

  // No reviews → Tier 1 + category defaults only
  if (!reviews || reviews.length === 0) {
    const result = [];
    // Tier 1 wins first
    Object.values(tier1).forEach(id => { if (byId[id]) result.push(byId[id]); });
    tier1Utility.forEach(id => { if (byId[id] && !result.find(r => r.id === id)) result.push(byId[id]); });
    // Fill remaining from defaults
    for (const [dim, val] of Object.entries(defaults)) {
      if (dim === 'utility') {
        (Array.isArray(val) ? val : [val]).forEach(id => {
          if (id && byId[id] && !result.find(r => r.id === id)) result.push(byId[id]);
        });
      } else if (val && byId[val] && !result.some(r => r.dimension === dim)) {
        result.push(byId[val]);
      }
    }
    const dimOrder = ['cost','atmosphere','social','environment','utility'];
    return result.sort((a,b) => dimOrder.indexOf(a.dimension) - dimOrder.indexOf(b.dimension)).slice(0, 5);
  }

  // ── TIER 2: Review keyword voting ──
  const votes = {};
  TAG_DEFS.forEach(t => { votes[t.id] = 0; });
  const allText = reviews.map(r => (r.text || '').toLowerCase()).join(' ');
  TAG_DEFS.forEach(t => {
    t.keywords.forEach(kw => { if (allText.includes(kw.toLowerCase())) votes[t.id]++; });
  });

  const result = [];

  // Apply Tier 1 overrides first (skip vote counts for these dimensions)
  const tier1Dims = new Set(Object.keys(tier1));
  Object.entries(tier1).forEach(([dim, id]) => { if (byId[id]) result.push(byId[id]); });
  tier1Utility.forEach(id => { if (byId[id]) result.push(byId[id]); });

  // Exclusive dimensions not covered by Tier 1: winner-takes-all from votes
  const exclusiveDims = [...new Set(TAG_DEFS.filter(t => t.exclusive).map(t => t.dimension))];
  exclusiveDims.filter(dim => !tier1Dims.has(dim)).forEach(dim => {
    const candidates = TAG_DEFS.filter(t => t.dimension === dim && t.exclusive);
    const winner = candidates.reduce((best, t) => votes[t.id] > votes[best.id] ? t : best, candidates[0]);
    if (votes[winner.id] > 0) result.push(winner);
  });

  // Additive tags not already added: include any with ≥1 vote
  TAG_DEFS.filter(t => !t.exclusive && votes[t.id] > 0 && !result.find(r => r.id === t.id))
    .forEach(t => result.push(t));

  // ── TIER 3: Category defaults fill any gaps ──
  for (const [dim, val] of Object.entries(defaults)) {
    if (dim === 'utility') {
      (Array.isArray(val) ? val : [val]).forEach(id => {
        if (id && byId[id] && !result.find(r => r.id === id)) result.push(byId[id]);
      });
    } else if (val && byId[val] && !result.some(r => r.dimension === dim)) {
      result.push(byId[val]);
    }
  }

  const dimOrder = ['cost','atmosphere','social','environment','utility'];
  result.sort((a, b) => dimOrder.indexOf(a.dimension) - dimOrder.indexOf(b.dimension));
  return result.slice(0, 5);
}

// Pre-compute and store tags on a place object (called after fetch + after enrichment)
function computeTags(place) {
  place.tags = deriveTagsFromReviews(place.reviews, place.type, place);
}

function renderTags(tags) {
  const el = document.getElementById('d-reviews');
  if (!tags || !tags.length) { el.innerHTML = ''; return; }
  el.innerHTML = `<div class="tags-label">Why go?</div><div class="tags-wrap">` +
    tags.map(t => `<span class="tag-pill">${t.emoji} ${t.label}</span>`).join('') +
    `</div>`;
}

function closeDetail() {
  document.getElementById('detail').classList.remove('open');
  document.getElementById('detail-backdrop').classList.remove('open');
  document.body.classList.remove('detail-open');
}

// ── ZOOM BUTTONS ──
document.getElementById('zoom-in').addEventListener('click', () => { if (map) map.setZoom(map.getZoom() + 1); });
document.getElementById('zoom-out').addEventListener('click', () => { if (map) map.setZoom(map.getZoom() - 1); });

// ── LOCATE BUTTON ──
(function setupLocateBtn() {
  const btn = document.getElementById('locate-btn');

  btn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showLocateError('Location not supported on this device');
      return;
    }
    btn.classList.add('locating');
    btn.classList.remove('active');
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        userLoc = { lat, lng };
        searchCenter = { lat, lng };
        map.panTo({ lat, lng });
        map.setZoom(15);
        btn.classList.remove('locating');
        btn.classList.add('active');
        // Remove active state when user pans away
        map.addListenerOnce('dragstart', () => btn.classList.remove('active'));
      },
      err => {
        btn.classList.remove('locating');
        const msg = err.code === 1
          ? 'Location access denied. Enable it in your browser settings.'
          : 'Could not get your location. Try again.';
        showLocateError(msg);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });

  function showLocateError(msg) {
    let toast = document.getElementById('locate-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'locate-toast';
      toast.style.cssText = 'position:fixed;bottom:230px;right:16px;z-index:60;background:#111;color:#fff;font-size:12px;font-weight:700;padding:10px 14px;border-radius:12px;max-width:220px;line-height:1.4;box-shadow:3px 3px 0 rgba(0,0,0,0.3)';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 3500);
  }
})();

// ── RENDER ──
function renderAll() { syncMarkers(); applyFilters(); }
