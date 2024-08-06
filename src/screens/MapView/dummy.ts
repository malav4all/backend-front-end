// Mock data, replace this with your actual data source
export const airports = [
  { latitude: 28.7041, longitude: 77.1025 }, // New Delhi
  { latitude: 19.076, longitude: 72.8777 }, // Mumbai
  { latitude: 12.9716, longitude: 77.5946 }, // Bangalore
  { latitude: 13.0827, longitude: 80.2707 }, // Chennai
  { latitude: 22.5726, longitude: 88.3639 }, // Kolkata
  { latitude: 17.385, longitude: 78.4867 }, // Hyderabad
  { latitude: 23.0225, longitude: 72.5714 }, // Ahmedabad
  { latitude: 18.5204, longitude: 73.8567 }, // Pune
  { latitude: 26.9124, longitude: 75.7873 }, // Jaipur
  { latitude: 22.7196, longitude: 75.8577 }, // Indore
  { latitude: 26.8467, longitude: 80.9462 }, // Lucknow
  { latitude: 21.1702, longitude: 72.8311 }, // Surat
  { latitude: 19.2183, longitude: 72.9781 }, // Navi Mumbai
  { latitude: 19.9975, longitude: 73.7898 }, // Nashik
  { latitude: 11.0168, longitude: 76.9558 }, // Coimbatore
  { latitude: 9.9312, longitude: 76.2673 }, // Kochi
  { latitude: 8.5241, longitude: 76.9366 }, // Thiruvananthapuram
  { latitude: 25.3176, longitude: 82.9739 }, // Varanasi
  { latitude: 21.1458, longitude: 79.0882 }, // Nagpur
  { latitude: 15.2993, longitude: 74.124 }, // Goa
  { latitude: 18.1124, longitude: 79.0193 }, // Warangal
  { latitude: 21.2514, longitude: 81.6296 }, // Raipur
  { latitude: 22.7196, longitude: 75.8577 }, // Bhopal
  { latitude: 26.4499, longitude: 74.6399 }, // Ajmer
  { latitude: 27.1767, longitude: 78.0081 }, // Agra
  { latitude: 30.7333, longitude: 76.7794 }, // Chandigarh
  { latitude: 23.3441, longitude: 85.3096 }, // Ranchi
  { latitude: 26.1445, longitude: 91.7362 }, // Guwahati
  { latitude: 25.396, longitude: 86.1194 }, // Patna
  { latitude: 34.0837, longitude: 74.7973 }, // Srinagar
  { latitude: 34.1526, longitude: 77.577 }, // Leh
  { latitude: 23.1591, longitude: 79.943 }, // Jabalpur
  { latitude: 15.8497, longitude: 74.4977 }, // Belgaum
  { latitude: 11.6643, longitude: 78.146 }, // Salem
  { latitude: 26.9124, longitude: 75.7873 }, // Udaipur
  { latitude: 28.6139, longitude: 77.209 }, // Gurgaon
  { latitude: 22.3072, longitude: 73.1812 }, // Vadodara
  { latitude: 25.5941, longitude: 85.1376 }, // Muzzafarpur
  { latitude: 22.5626, longitude: 88.363 }, // Howrah
  { latitude: 22.5535, longitude: 88.3378 }, // Alipore
  { latitude: 11.2588, longitude: 75.7804 }, // Kozhikode
  { latitude: 28.5799, longitude: 77.329 }, // Noida
  { latitude: 23.25, longitude: 77.4166 }, // Dewas
  { latitude: 24.5854, longitude: 73.7125 }, // Udaipur
  { latitude: 30.9, longitude: 75.8573 }, // Ludhiana
  { latitude: 28.4595, longitude: 77.0266 }, // Gurugram
  { latitude: 12.2958, longitude: 76.6394 }, // Mysore
  { latitude: 18.5204, longitude: 73.8567 }, // Pimpri-Chinchwad
  { latitude: 24.5859, longitude: 73.7125 }, // Udaipur
  { latitude: 26.4499, longitude: 80.3319 }, // Kanpur
  { latitude: 29.4727, longitude: 77.7085 }, // Roorkee
  { latitude: 20.3111, longitude: 85.8185 }, // Bhubaneswar
  { latitude: 20.9517, longitude: 85.0985 }, // Cuttack
  { latitude: 25.7925, longitude: 85.2439 }, // Gaya
  { latitude: 23.3441, longitude: 85.3096 }, // Jamshedpur
  { latitude: 20.9167, longitude: 70.3667 }, // Diu
  { latitude: 31.1048, longitude: 77.1734 }, // Shimla
  { latitude: 25.453, longitude: 78.5281 }, // Jhansi
  { latitude: 25.2866, longitude: 73.8973 }, // Pali
  { latitude: 25.3801, longitude: 86.4667 }, // Begusarai
  { latitude: 19.9242, longitude: 75.221 }, // Aurangabad
  { latitude: 21.238, longitude: 81.6395 }, // Durg
  { latitude: 29.9457, longitude: 78.1642 }, // Haridwar
  { latitude: 26.8588, longitude: 81.0214 }, // Sitapur
  { latitude: 26.4537, longitude: 80.3326 }, // Unnao
  { latitude: 27.8974, longitude: 78.0798 }, // Hathras
  { latitude: 21.4669, longitude: 70.4662 }, // Junagadh
  { latitude: 22.5243, longitude: 72.2573 }, // Surendranagar
  { latitude: 23.2156, longitude: 72.6369 }, // Gandhinagar
  { latitude: 23.0323, longitude: 72.5642 }, // Gandhinagar
  { latitude: 19.9318, longitude: 76.4749 }, // Jalna
  { latitude: 19.1602, longitude: 72.9702 }, // Navi Mumbai
  { latitude: 18.9322, longitude: 72.8353 }, // Borivali
  { latitude: 18.9614, longitude: 72.8236 }, // Juhu
  { latitude: 19.132, longitude: 72.9176 }, // Andheri
  { latitude: 22.3374, longitude: 73.2124 }, // Vadodara
  { latitude: 22.6808, longitude: 88.3582 }, // Barrackpore
  { latitude: 22.6193, longitude: 88.3814 }, // Kalyani
  { latitude: 25.4373, longitude: 81.8787 }, // Prayagraj
  { latitude: 22.2809, longitude: 84.7645 }, // Rourkela
  { latitude: 21.0845, longitude: 79.0142 }, // Chandrapur
  { latitude: 15.848, longitude: 74.496 }, // Belgaum
  { latitude: 23.2599, longitude: 77.4126 }, // Bhopal
  { latitude: 21.7706, longitude: 78.8718 }, // Chhindwara
  { latitude: 26.7606, longitude: 83.3732 }, // Gorakhpur
  { latitude: 22.0675, longitude: 78.9372 }, // Mandla
  { latitude: 24.8132, longitude: 75.5646 }, // Bhilwara
  { latitude: 25.3428, longitude: 86.3201 }, // Begusarai
  { latitude: 22.998, longitude: 79.5578 }, // Sagar
  { latitude: 30.7333, longitude: 76.7794 }, // Mohali
  { latitude: 26.9124, longitude: 75.7873 }, // Jodhpur
  { latitude: 22.5726, longitude: 88.3639 }, // Shibpur
  { latitude: 25.4191, longitude: 86.1292 }, // Darbhanga
  { latitude: 25.5832, longitude: 85.0679 }, // Barauni
  { latitude: 26.4499, longitude: 74.6399 }, // Ajmer
  { latitude: 29.5656, longitude: 77.2725 }, // Shamli
  { latitude: 28.5583, longitude: 77.2915 }, // Ghaziabad
  { latitude: 21.095, longitude: 78.9602 }, // Seoni
  { latitude: 19.8453, longitude: 75.3303 }, // Jalgaon
  { latitude: 24.7914, longitude: 85.0002 }, // Kaimur
  { latitude: 26.2389, longitude: 73.0243 }, // Pali
  { latitude: 23.0208, longitude: 72.5619 }, // Nadiad
  { latitude: 25.5941, longitude: 85.1376 }, // Patna
  { latitude: 13.0827, longitude: 80.2707 }, // Madurai
  { latitude: 19.9975, longitude: 73.7898 }, // Shirdi
  { latitude: 13.3409, longitude: 74.7421 }, // Udupi
  { latitude: 31.3260, longitude: 75.5762 }, // Jalandhar
  { latitude: 20.2574, longitude: 85.7597 }, // Puri
  { latitude: 30.1575, longitude: 78.3210 }, // Mussoorie
  { latitude: 24.5859, longitude: 73.7125 }, // Udaipur
  { latitude: 25.4358, longitude: 81.8463 }, // Prayagraj
  { latitude: 25.3176, longitude: 82.9739 }, // Varanasi
  { latitude: 27.1767, longitude: 78.0081 }, // Agra
  { latitude: 26.9124, longitude: 75.7873 }, // Jaipur
  { latitude: 25.6872, longitude: 85.3254 }, // Patna
  { latitude: 27.2046, longitude: 77.4977 }, // Bharatpur
  { latitude: 27.2152, longitude: 77.4906 }, // Mathura
  { latitude: 29.9457, longitude: 78.1642 }, // Rishikesh
  { latitude: 31.1048, longitude: 77.1734 }, // Shimla
  { latitude: 30.3165, longitude: 78.0322 }, // Dehradun
  { latitude: 30.7046, longitude: 76.7179 }, // Chandigarh
  { latitude: 29.4727, longitude: 77.7085 }, // Meerut
  { latitude: 26.2389, longitude: 73.0243 }, // Jodhpur
  { latitude: 25.5941, longitude: 85.1376 }, // Gaya
  { latitude: 29.4727, longitude: 77.7085 }, // Rohtak
  { latitude: 29.3976, longitude: 76.9635 }, // Panipat
  { latitude: 25.4198, longitude: 78.6576 }, // Jhansi
  { latitude: 27.1523, longitude: 80.5924 }, // Kanpur
  { latitude: 22.2739, longitude: 87.8615 }, // Kharagpur
  { latitude: 25.3960, longitude: 86.1194 }, // Patna
  { latitude: 23.3441, longitude: 85.3096 }, // Ranchi
  { latitude: 23.6102, longitude: 85.2799 }, // Bokaro Steel City
  { latitude: 27.5300, longitude: 80.6175 }, // Sitapur
  { latitude: 25.7743, longitude: 86.0692 }, // Begusarai
  { latitude: 25.2649, longitude: 88.3733 }, // Malda
  { latitude: 24.3620, longitude: 88.6241 }, // Murshidabad
  { latitude: 23.1656, longitude: 86.4304 }, // Dhanbad
  { latitude: 24.0478, longitude: 85.9638 }, // Hazaribagh
  { latitude: 25.8560, longitude: 87.8365 }, // Purnia
  { latitude: 24.1667, longitude: 86.2333 }, // Giridih
  { latitude: 25.6773, longitude: 85.9808 }, // Munger
  { latitude: 23.1765, longitude: 88.4355 }, // Bongaon
  { latitude: 24.2338, longitude: 88.4340 }, // Balurghat
  { latitude: 26.2648, longitude: 88.7465 }, // Cooch Behar
  { latitude: 24.8235, longitude: 92.7772 }, // Silchar
  { latitude: 24.8170, longitude: 93.9368 }, // Imphal
  { latitude: 27.3630, longitude: 88.6140 }, // Darjeeling
  { latitude: 24.7785, longitude: 92.5963 }, // Agartala
  { latitude: 25.5950, longitude: 91.8824 }, // Shillong
  { latitude: 27.0553, longitude: 93.6087 }, // Itanagar
  { latitude: 23.7595, longitude: 91.2901 }, // Agartala
  { latitude: 23.4715, longitude: 87.3505 }, // Asansol
  { latitude: 24.7897, longitude: 92.8577 }, // Kailashahar
  { latitude: 26.2285, longitude: 92.7013 }, // Nagaon
  { latitude: 26.2441, longitude: 92.7891 }, // Tezpur
  { latitude: 26.6500, longitude: 92.1900 }, // Dibrugarh
  { latitude: 24.8147, longitude: 92.0763 }, // Karimganj
  { latitude: 25.7856, longitude: 93.0800 }, // Mokokchung
  { latitude: 24.3834, longitude: 93.0471 }, // Churachandpur
  { latitude: 26.1542, longitude: 94.5624 }, // Kohima
  { latitude: 26.6009, longitude: 93.8992 }, // Dimapur
  { latitude: 24.8170, longitude: 93.9368 }, // Imphal
  { latitude: 24.1594, longitude: 91.4707 }, // Khowai
  { latitude: 23.8423, longitude: 91.2886 }, // Teliamura
  { latitude: 25.7598, longitude: 93.6856 }, // Charaideo
  { latitude: 27.0294, longitude: 93.2630 }, // Ziro
  { latitude: 25.2484, longitude: 92.8988 }, // Haflong
  { latitude: 24.7665, longitude: 92.6436 }, // Dharmanagar
  { latitude: 27.1977, longitude: 93.7042 }, // Peren
  { latitude: 27.1201, longitude: 92.5221 }, // Bomdila
  { latitude: 24.4982, longitude: 93.7000 }, // Moreh
  { latitude: 23.8316, longitude: 91.2868 }, // Ambassa
  { latitude: 27.2977, longitude: 88.2461 }, // Mangan
  { latitude: 24.7752, longitude: 93.1330 }, // Ukhrul
  { latitude: 27.0494, longitude: 93.6022 }, // Ziro
  { latitude: 26.5738, longitude: 93.3410 }, // Mon
  { latitude: 27.1712, longitude: 92.6076 }, // Tawang
  { latitude: 24.8288, longitude: 93.9368 }, // Thoubal
  { latitude: 26.2648, longitude: 88.7407 }, // Koch Bihar
  { latitude: 27.2500, longitude: 94.2167 }, // Itanagar
  { latitude: 25.6020, longitude: 91.8825 }, // Shillong
  { latitude: 25.5333, longitude: 91.8833 }, // Jowai
  { latitude: 27.2620, longitude: 95.1106 }, // Tezu
  { latitude: 24.1388, longitude: 92.0096 }, // Kailashahar
  { latitude: 25.9025, longitude: 94.5581 }, // Tuensang
  { latitude: 25.9092, longitude: 93.7277 }, // Chandel
  { latitude: 25.7466, longitude: 94.1070 }, // Margherita
  { latitude: 27.0962, longitude: 94.7219 }, // Along
  { latitude: 27.0594, longitude: 93.8328 }, // Tura
  { latitude: 25.6637, longitude: 94.1073 }, // Longleng
  { latitude: 26.8190, longitude: 94.9165 }, // Khonsa
  { latitude: 26.1333, longitude: 91.6667 }, // Diphu
  { latitude: 26.1025, longitude: 94.1059 }, // Longding
  { latitude: 26.6036, longitude: 92.5353 }, // Haflong
  { latitude: 26.5333, longitude: 92.9000 }, // Kokrajhar
  { latitude: 26.7285, longitude: 88.4314 }, // Jalpaiguri
  { latitude: 24.0917, longitude: 88.2681 }, // Murshidabad
  { latitude: 23.6897, longitude: 86.9453 }, // Purulia
  { latitude: 26.4745, longitude: 87.2718 }, // Araria
  { latitude: 25.0400, longitude: 86.4963 }, // Saharsa
  { latitude: 26.1522, longitude: 85.8917 }, // Darbhanga
  { latitude: 27.0317, longitude: 84.6163 }, // Bettiah
  { latitude: 26.7745, longitude: 84.7276 }, // Gopalganj
  { latitude: 25.4019, longitude: 86.4713 }, // Khagaria
  { latitude: 25.7883, longitude: 86.4806 }, // Katihar
  { latitude: 25.8617, longitude: 84.4800 }, // Chhapra
  { latitude: 26.8184, longitude: 83.3633 }, // Gorakhpur
  { latitude: 27.5170, longitude: 83.6718 }, // Maharajganj
  { latitude: 25.2425, longitude: 85.5355 }, // Lakhisarai
  { latitude: 25.4977, longitude: 85.2642 }, // Nalanda
  { latitude: 24.9248, longitude: 84.1850 }, // Aurangabad (Bihar)
  { latitude: 25.7539, longitude: 84.9667 }, // Buxar
  { latitude: 25.5983, longitude: 83.9728 }, // Siwan
  { latitude: 25.3082, longitude: 84.5116 }, // Bhabua
  { latitude: 25.0776, longitude: 84.3298 }, // Jehanabad
  { latitude: 25.6474, longitude: 85.2071 }, // Sheikhpura
  { latitude: 25.6008, longitude: 85.1376 }, // Samastipur
  { latitude: 24.8266, longitude: 85.0233 }, // Jamui
  { latitude: 25.7942, longitude: 85.2320 }, // Vaishali
  { latitude: 27.9244, longitude: 80.9024 }, // Bahraich
  { latitude: 25.8696, longitude: 80.9120 }, // Rae Bareli
  { latitude: 26.7394, longitude: 80.7812 }, // Barabanki
  { latitude: 25.4735, longitude: 81.8787 }, // Fatehpur
  { latitude: 26.3309, longitude: 80.5985 }, // Kanpur Dehat
  { latitude: 26.4763, longitude: 79.1441 }, // Kanpur
  { latitude: 26.3376, longitude: 81.0346 }, // Unnao
  { latitude: 27.0758, longitude: 81.8825 }, // Hardoi
  { latitude: 27.6197, longitude: 81.6140 }, // Sitapur
  { latitude: 28.7844, longitude: 79.0214 }, // Rampur
  { latitude: 28.3587, longitude: 79.4175 }, // Bareilly
  { latitude: 27.2855, longitude: 80.7742 }, // Shahjahanpur
  { latitude: 28.6562, longitude: 77.5100 }, // Ghaziabad
  { latitude: 29.9457, longitude: 78.1642 }, // Haridwar
  { latitude: 27.8948, longitude: 78.0788 }, // Hathras
  { latitude: 26.7606, longitude: 83.3732 }, // Kushinagar
  { latitude: 25.9154, longitude: 83.5618 }, // Azamgarh
  { latitude: 26.2737, longitude: 83.0785 }, // Deoria
  { latitude: 26.7769, longitude: 83.3641 }, // Sant Kabir Nagar
  { latitude: 25.9073, longitude: 82.4010 }, // Mirzapur
  { latitude: 25.1460, longitude: 82.5698 }, // Varanasi
  { latitude: 24.7268, longitude: 81.0211 }, // Rewa
  { latitude: 24.5340, longitude: 82.1644 }, // Sidhi
  { latitude: 23.2314, longitude: 77.4336 }, // Sehore
  { latitude: 22.7617, longitude: 78.7835 }, // Betul
  { latitude: 23.5204, longitude: 76.4812 }, // Shajapur
  { latitude: 23.9448, longitude: 77.7891 }, // Raisen
  { latitude: 23.1696, longitude: 75.7847 }, // Ratlam
  { latitude: 24.4000, longitude: 76.9500 }, // Mandsaur
  { latitude: 22.3445, longitude: 74.5775 }, // Dhar
  { latitude: 21.8394, longitude: 73.7192 }, // Alirajpur
  { latitude: 21.6736, longitude: 74.0000 }, // Barwani
  { latitude: 23.4203, longitude: 75.0205 }, // Khandwa
  { latitude: 23.5860, longitude: 75.7285 }, // Dewas
  { latitude: 24.0570, longitude: 74.5815 }, // Jhalawar
  { latitude: 26.9124, longitude: 75.7873 }, // Tonk
  { latitude: 26.1584, longitude: 75.3875 }, // Bundi
  { latitude: 27.0238, longitude: 75.0243 }, // Chomu
  { latitude: 27.5192, longitude: 76.2800 }, // Alwar
  { latitude: 27.2135, longitude: 75.7675 }, // Sikar
  { latitude: 27.8110, longitude: 75.7643 }, // Jhunjhunu
  { latitude: 25.1800, longitude: 73.8351 }, // Sirohi
  { latitude: 26.4499, longitude: 74.6399 }, // Pali
  { latitude: 26.4499, longitude: 74.6418 }, // Nagaur
  { latitude: 25.0961, longitude: 74.5982 }, // Bhilwara
  { latitude: 23.2185, longitude: 72.6369 }, // Mehsana
  { latitude: 22.7377, longitude: 75.8513 }, // Khargone
  { latitude: 25.2966, longitude: 81.0570 }, // Rae Bareli
  { latitude: 22.7270, longitude: 72.6642 }, // Patan
  { latitude: 22.0833, longitude: 71.1833 }, // Botad
  { latitude: 23.0667, longitude: 72.4000 }, // Gandhinagar
  { latitude: 21.6421, longitude: 72.9576 }, // Surat
  { latitude: 20.9467, longitude: 72.9557 }, // Navsari
  { latitude: 23.8308, longitude: 72.7094 }, // Dholka
  { latitude: 22.5546, longitude: 72.9335 }, // Anand
  { latitude: 21.7595, longitude: 72.1535 }, // Bhavnagar
  { latitude: 22.3072, longitude: 73.1812 }, // Vadodara
  { latitude: 20.8070, longitude: 71.0088 }, // Valsad
  { latitude: 23.3624, longitude: 72.5630 }, // Kalol
  { latitude: 21.1702, longitude: 72.8311 }, // Surat
  { latitude: 22.5674, longitude: 72.9289 }, // Nadiad
  { latitude: 20.9320, longitude: 72.7938 }, // Daman
  { latitude: 28.9845, longitude: 77.7064 }, // Meerut
  { latitude: 28.4089, longitude: 77.3178 }, // Faridabad
  { latitude: 28.6633, longitude: 77.4942 }, // Ghaziabad
  { latitude: 28.6773, longitude: 77.1183 }, // Noida
  { latitude: 28.4595, longitude: 77.0266 }, // Gurgaon
  { latitude: 29.4727, longitude: 77.7085 }, // Muzaffarnagar
  { latitude: 28.9844, longitude: 77.7064 }, // Meerut
  { latitude: 29.0561, longitude: 77.8880 }, // Saharanpur
  { latitude: 29.8232, longitude: 77.4014 }, // Deoband
  { latitude: 29.7662, longitude: 77.3164 }, // Roorkee
  { latitude: 30.2830, longitude: 77.8745 }, // Yamunanagar
  { latitude: 29.6821, longitude: 77.4442 }, // Karnal
  { latitude: 29.6803, longitude: 76.9897 }, // Panipat
  { latitude: 29.4766, longitude: 77.6968 }, // Baghpat
  { latitude: 28.8337, longitude: 77.4442 }, // Shahdara
  { latitude: 28.4595, longitude: 77.0266 }, // Gurgaon
  { latitude: 29.1544, longitude: 75.7217 }, // Bhiwani
  { latitude: 28.8386, longitude: 76.4435 }, // Jhajjar
  { latitude: 29.1682, longitude: 76.7033 }, // Sonipat
  { latitude: 29.5216, longitude: 75.0078 }, // Hisar
  { latitude: 29.6664, longitude: 76.9890 }, // Jind
  { latitude: 30.6942, longitude: 76.8606 }, // Panchkula
  { latitude: 30.7333, longitude: 76.7794 }, // Chandigarh
  { latitude: 29.6525, longitude: 77.4784 }, // Shamli
  { latitude: 29.3976, longitude: 76.9635 }, // Panipat
  { latitude: 30.3782, longitude: 76.7767 }, // Mohali
  { latitude: 30.3275, longitude: 76.4008 }, // Patiala
  { latitude: 30.7046, longitude: 76.7179 }, // Zirakpur
  { latitude: 30.3794, longitude: 76.7721 }, // Mohali
  { latitude: 30.7400, longitude: 76.7800 }, // Kharar
  { latitude: 31.6330, longitude: 75.5668 }, // Kapurthala
  { latitude: 31.6340, longitude: 75.5611 }, // Jalandhar
  { latitude: 32.0848, longitude: 76.2445 }, // Dharamshala
  { latitude: 32.1107, longitude: 76.5363 }, // Mandi
  { latitude: 31.9888, longitude: 76.2711 }, // Kangra
  { latitude: 30.9145, longitude: 77.1418 }, // Solan
  { latitude: 31.1048, longitude: 77.1734 }, // Shimla
  { latitude: 31.5833, longitude: 76.9167 }, // Hamirpur
  { latitude: 31.5333, longitude: 76.2833 }, // Bilaspur
  { latitude: 31.2308, longitude: 76.3791 }, // Nangal
  { latitude: 31.7612, longitude: 76.2768 }, // Una
  { latitude: 32.0998, longitude: 76.2691 }, // Palampur
  { latitude: 31.5833, longitude: 77.1667 }, // Kullu
  { latitude: 32.2570, longitude: 77.1766 }, // Manali
  { latitude: 32.1107, longitude: 76.5363 }, // Mandi
  { latitude: 31.8461, longitude: 76.5783 }, // Joginder Nagar
  { latitude: 32.0095, longitude: 76.5917 }, // Karsog
  { latitude: 31.4547, longitude: 77.0461 }, // Nalagarh
  { latitude: 32.0864, longitude: 76.4726 }, // Bharmour
  { latitude: 31.5833, longitude: 77.9167 }, // Lahaul & Spiti
  { latitude: 31.4953, longitude: 77.4519 }, // Chamba
  { latitude: 32.5614, longitude: 76.9186 }, // Keylong
  { latitude: 32.2960, longitude: 78.1443 }, // Kaza
  { latitude: 32.2460, longitude: 78.0232 }, // Kalpa
  { latitude: 30.8399, longitude: 78.1028 }, // Badrinath
  { latitude: 30.4733, longitude: 78.0628 }, // Dehradun
  { latitude: 30.1990, longitude: 78.9818 }, // Rishikesh
  { latitude: 30.4090, longitude: 78.1237 }, // Mussoorie
  { latitude: 30.1454, longitude: 78.0583 }, // Dhanaulti
  { latitude: 29.9544, longitude: 78.1598 }, // Chamba
  { latitude: 29.9311, longitude: 78.0422 }, // Tehri Garhwal
  { latitude: 29.5584, longitude: 79.6632 }, // Almora
  { latitude: 29.3974, longitude: 78.8500 }, // Nainital
  { latitude: 29.2921, longitude: 79.6080 }, // Bageshwar
  { latitude: 29.8584, longitude: 79.4182 }, // Pithoragarh
  { latitude: 29.7132, longitude: 80.0521 }, // Champawat
  { latitude: 29.3525, longitude: 79.3061 }, // Rudrapur
  { latitude: 29.0626, longitude: 79.6178 }, // Haldwani
  { latitude: 30.1251, longitude: 79.0946 }, // Srinagar (Garhwal)
  { latitude: 29.2466, longitude: 79.4797 }, // Ranikhet
  { latitude: 30.3931, longitude: 78.4815 }, // Joshimath
  { latitude: 29.5868, longitude: 80.1809 }, // Dharchula
  { latitude: 29.2734, longitude: 78.8372 }, // Kashipur
  { latitude: 29.8384, longitude: 78.7786 }, // Kotdwar
  { latitude: 29.7544, longitude: 78.8826 }, // Lansdowne
  { latitude: 30.1337, longitude: 78.8507 }, // Roorkee
  { latitude: 29.8685, longitude: 78.7098 }, // Haridwar
];