




// NOTE: was bare `webpage="alx"` etc (no let/const) — these leaked as
// implicit globals. Also `url` referenced an undeclared `webPage` (capital P)
// instead of `webpage`, which throws a ReferenceError the moment this file
// runs (reading an unassigned undeclared identifier always throws, even
// outside strict mode) — every URL below was unreachable. Fixed both.
const webpage = "alx";
const person =
{
  user:"alx",
  email:"alx",
};


const url = [
  "https://www.facebook.com/"+webpage,
  "https://www.instagram.com/"+webpage,
  "https://mail.yandex.com/?uid=869376094#compose",
  "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to="+person["email"]+"&su=DenunciaAnimale&body=my-text&ui=2&tf=1&pli=1",
  "https://web.telegram.org",
  "https://www.skype.com",
  "https://chat.whatsapp.com/a"+webpage,
  "https://www.patreon.com/"+webpage,
  "https://www.bitcoin.com/",
  "https://www.paypal.com/"+webpage,
  "https://www.mercadopago.com.br/"+webpage,
  "https://pagseguro.uol.com.br/"+webpage,
  "https://www.visa.com/"+webpage,
  "https://www.bradesco.com/"+webpage,
  "https://www.itau.com/"+webpage,
  "http://www.twitter.com/"+webpage
  ];
