# Rent-A-Car UI

**Rent-A-Car UI** projesi, Rent-A-Car API'si ile etkileşimde bulunan bir React tabanlı ön yüz (frontend) uygulamasıdır. Bu uygulama, araç kiralama işlemlerini yönetmek ve kullanıcıların araçları listelemek, eklemek, düzenlemek, kiralamak ve fatura oluşturmak gibi işlemleri gerçekleştirmelerine olanak sağlar.

Proje, **Create React App** ile başlatılmış olup, **React**, **React Router**, **Bootstrap** ve **Axios** gibi modern JavaScript kütüphaneleri ve araçları kullanılarak geliştirilmiştir.

---

## Proje Yapısı

Bu proje, araç kiralama işlemleriyle ilgili verileri kullanıcı arayüzünde görselleştiren ve yöneten bir uygulamadır. Kullanıcılar, araç markalarını, araçlarını, modellerini, kiralama işlemlerini ve faturaları kolayca yönetebilirler.

### 1. **Ana Sayfalar**
- **Brand Sayfası**: Araç markalarının listelendiği, yeni marka eklemek ve mevcut markaları düzenlemek için kullanılan sayfadır.
- **Car Sayfası**: Kiralanabilir araçların listelendiği ve yeni araç eklemek, mevcut araçları düzenlemek için kullanılan sayfadır.
- **Model Sayfası**: Araç modellerinin yönetildiği sayfadır. Kullanıcılar yeni model ekleyebilir ve mevcut modelleri düzenleyebilir.
- **Rental Sayfası**: Araç kiralama işlemlerinin yönetildiği ve kiralama işlemleri eklenip düzenlenebilen sayfadır.
- **Invoice Sayfası**: Araç kiralama faturalarının görüntülendiği ve detaylarının gösterildiği sayfadır.

### 2. **API Bağlantısı**
Bu uygulama, arka uçta bulunan Rent-A-Car API'siyle iletişim kurar. API ile etkileşim için **Axios** kullanılmıştır. Tüm veri alışverişi ve işlemler API üzerinden yapılır.

### 3. **Navigasyon ve Routing**
Kullanıcılar, **React Router** kullanılarak farklı sayfalar arasında geçiş yapabilir. Sayfalar arasında geçiş yapmak için sağlanan yönlendirmeler oldukça sezgiseldir.

### 4. **Responsive Tasarım**
Tüm sayfalar, farklı cihazlarda düzgün çalışabilmesi için **Bootstrap**'in sunduğu responsive özelliklerle tasarlanmıştır.

---

## Kullanılan Teknolojiler

- **React**: Projenin ön yüzünü geliştirmek için **React** kütüphanesi kullanılmıştır.
- **React Router**: Sayfalar arası yönlendirme ve gezinti için **React Router** kullanılmıştır.
- **Axios**: API ile veri iletişimi için **Axios** kütüphanesi kullanılmıştır.
- **Bootstrap**: Tasarım ve responsive özellikler için **Bootstrap** kullanılmıştır.
- **Date-fns**: Tarih ve zaman işlemleri için **Date-fns** kütüphanesi kullanılmıştır.
- **React Bootstrap**: Bootstrap bileşenlerinin React uygulamasına entegre edilmesi için **React Bootstrap** kullanılmıştır.
- **React Testing Library**: React bileşenlerini test etmek için **React Testing Library** kullanılmıştır.

---

## Projenin Fotoğrafları

Aşağıda, projenin farklı sayfalarına ait fotoğraflar yer almaktadır:

### **Brand Sayfası**
- **Marka Listesi**: Araç markalarının listelendiği sayfa.
![Brand List](https://github.com/ynskrc23/rent-a-car-ui/blob/master/image/brandlist.PNG)
- **Yeni Marka Ekleme**: Yeni bir araç markası eklemek için kullanılan form sayfası.
![Brand Add](https://github.com/ynskrc23/rent-a-car-ui/blob/master/image/brandadd.PNG)
- **Marka Düzenleme**: Mevcut bir araç markasının düzenlendiği sayfa.
![Brand Edit](https://github.com/ynskrc23/rent-a-car-ui/blob/master/image/brandedit.PNG)

### **Car Sayfası**
- **Araç Listesi**: Kiralanabilir araçların listelendiği sayfa.
![Car List](https://github.com/ynskrc23/rent-a-car-ui/blob/master/image/carlist.PNG)
- **Yeni Araç Ekleme**: Yeni bir araç eklemek için kullanılan form sayfası.
![Car Add](https://github.com/ynskrc23/rent-a-car-ui/blob/master/image/caradd.PNG)
- **Araç Düzenleme**: Mevcut bir aracın düzenlendiği sayfa.
![Car Edit](https://github.com/ynskrc23/rent-a-car-ui/blob/master/image/caredit.PNG)

### **Model Sayfası**
- **Model Listesi**: Araç modellerinin listelendiği sayfa.
![Model List](https://github.com/ynskrc23/rent-a-car-ui/blob/master/image/modellist.PNG)
- **Yeni Model Ekleme**: Yeni bir araç modeli eklemek için kullanılan form sayfası.
![Model Add](https://github.com/ynskrc23/rent-a-car-ui/blob/master/image/modeladd.PNG)
- **Model Düzenleme**: Mevcut bir modelin düzenlendiği sayfa.
![Model Edit](https://github.com/ynskrc23/rent-a-car-ui/blob/master/image/modeledit.PNG)

### **Rental Sayfası**
- **Kiralama Listesi**: Mevcut kiralama işlemlerinin listelendiği sayfa.
![Rental List](https://github.com/ynskrc23/rent-a-car-ui/blob/master/image/rentallist.PNG)
- **Yeni Kiralama Ekleme**: Yeni bir araç kiralama işlemi eklemek için kullanılan form sayfası.
![Rental Add](https://github.com/ynskrc23/rent-a-car-ui/blob/master/image/rentaladd.PNG)

### **Invoice Sayfası**
- **Fatura Listesi**: Kiralama faturalarının listelendiği sayfa.
![Invoice List](https://github.com/ynskrc23/rent-a-car-ui/blob/master/image/invoicelist.PNG)
- **Fatura Detayı**: Seçilen faturanın detaylarının gösterildiği sayfa.
![Invoice Detail](https://github.com/ynskrc23/rent-a-car-ui/blob/master/image/invoicedetail.PNG)

---

## Uygulamayı Çalıştırma

### 1. **Gerekli Bağımlılıkları Yükleme**

Projeyi çalıştırmadan önce gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırabilirsiniz:

```bash
npm install
```
### 2. Uygulamayı Başlatma

Projeyi başlatmak için şu komutu kullanabilirsiniz:

```bash
npm start
```
