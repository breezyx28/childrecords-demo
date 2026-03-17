import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Child Record",
  description:
    "At Child Records, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, store, and share your data when you visit our website or use our services. By using our services, you agree to the terms of this Privacy Policy.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Privacy Policy - Child Records",
    description:
      "At Child Records, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, store, and share your data when you visit our website or use our services. By using our services, you agree to the terms of this Privacy Policy.",
    url: "https://www.yourwebsite.com/privacy-policy",
  },
};

const PrivacyPolicy = () => {
  return (
    <>
      <div className="w-full bg-primary-600 mx-auto">
        <header className="w-full">
          <h1 className="text-white text-[48px] font-[800] leading-[65.47px] container">
            Privacy Policy
          </h1>
        </header>
      </div>

      <main className="container">
        <article className="w-full">
          <section aria-labelledby="privacy-policy">
            <h2 id="privacy-policy">Privacy Policy</h2>
            <p>
              Privacy Policy for   www.childrecords.care Last Updated:
              <br /> on 20th October 2024
              <br /> At Child Records, we value your privacy and are committed
              to protecting your personal information. This Privacy Policy
              outlines how we collect, use, store, and share your data when you
              visit our website or use our services. By using our services, you
              agree to the terms of this Privacy Policy.
            </p>
          </section>

          <section aria-labelledby="personal-information">
            <h2 id="personal-information">1. Information We Collect</h2>
            <h3>Personal Data:</h3>
            <p>
              When you create an account or interact with our services, we may
              collect the following personal data:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>{"Child's name and date of birth"}</li>
              <li>Medical records and health information</li>
              <li>Any other information you voluntarily provide to us</li>
            </ul>
            <br />
            <h3>Usage Data:</h3>
            <p>
              We may also collect information about how you access and use our
              website, including:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited</li>
              <li>Time and date of visit</li>
              <li>Time spent on pages</li>
            </ul>
          </section>

          <section aria-labelledby="data-collection">
            <h2 id="data-collection">2. Purpose of Data Collection</h2>
            <p>We collect your personal data for the following purposes:</p>
            <ul>
              <li>To provide and maintain our services</li>
              <li>To manage your account and provide customer support</li>
              <li>
                To send you updates, newsletters, and promotional materials (if
                you have opted in)
              </li>
              <li>To analyze website usage and improve our services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section aria-labelledby="legal-personal-data">
            <h2 id="legal-personal-data">
              3. Legal Basis for Processing Personal Data
            </h2>
            <p>
              We process your personal data based on the following legal
              grounds:
            </p>
            <ul>
              <li>
                Consent: You have given consent for us to process your personal
                data for specific purposes.
              </li>
              <li>
                Contractual necessity: Processing is necessary for the
                performance of a contract to which you are a party.
              </li>
              <li>
                Legal obligation: We must comply with applicable laws and
                regulations.
              </li>
            </ul>
          </section>

          <section aria-labelledby="data-storage-retention">
            <h2 id="data-storage-retention">4. Data Storage and Retention</h2>
            <p>
              We store your personal data on secure servers and implement
              appropriate technical and organizational measures to protect it
              from unauthorized access, loss, or misuse. Your data will be
              retained only for as long as necessary to fulfill the purposes
              outlined in this Privacy Policy, or as required by law.
            </p>
          </section>

          <section aria-labelledby="data-sharing-disclosure">
            <h2 id="data-sharing-disclosure">5. Data Sharing and Disclosure</h2>
            <p>
              We do not sell or rent your personal data to third parties. We may
              share your information in the following circumstances:
            </p>
            <ul>
              <li>
                Service Providers: We may engage third-party vendors to assist
                in providing our services, who will only have access to your
                data as necessary to perform their functions and must protect
                it.
              </li>
              <li>
                Legal Compliance: We may disclose your personal data if required
                by law or to comply with legal processes.
              </li>
              <li>
                Business Transfers: In the event of a merger, acquisition, or
                sale of all or a portion of our assets, your personal data may
                be transferred as part of that business transaction.
              </li>
            </ul>
          </section>

          <section aria-labelledby="data-security">
            <h2 id="data-security">6. Data Security</h2>
            <p>
              We implement a variety of security measures to protect your
              personal data. These measures include encryption, firewalls, and
              secure server hosting. However, please be aware that no method of
              transmission over the internet or method of electronic storage is
              100% secure, and we cannot guarantee its absolute security.
            </p>
          </section>

          <section aria-labelledby="users-rights">
            <h2 id="users-rights">{"7. Users' Rights"}</h2>
            <p>
              Under the General Data Protection Regulation (GDPR), you have the
              following rights regarding your personal data:
            </p>
            <ul>
              <li>
                Right to Access: You can request access to the personal data we
                hold about you.
              </li>
              <li>
                Right to Rectification: You have the right to request correction
                of inaccurate or incomplete data.
              </li>
              <li>
                Right to Erasure: You can request the deletion of your personal
                data when it is no longer necessary for the purposes for which
                it was collected.
              </li>
              <li>
                Right to Restrict Processing: You can request that we limit the
                processing of your personal data under certain conditions.
              </li>
              <li>
                Right to Data Portability: You have the right to request a copy
                of your personal data in a structured, commonly used, and
                machine-readable format.
              </li>
              <li>
                Right to Object: You can object to the processing of your
                personal data under certain conditions.
              </li>
            </ul>
            <br />
            <p>
              To exercise these rights, please contact us at:
              support@childrecords.care
            </p>
          </section>

          <section aria-labelledby="change-to-this-privacy-policy">
            <h2 id="change-to-this-privacy-policy">
              8. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page, and we encourage you to review this
              Privacy Policy periodically for any updates. Your continued use of
              our services after any changes constitutes your acceptance of the
              new terms.
            </p>
          </section>

          <section aria-labelledby="contact-us">
            <h2 id="contact-us">9. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at:
            </p>
            <p>Email: support@childrecords.care</p>
            <br />
          </section>

          <section aria-labelledby="cookies-tracking-technologies">
            <h2 id="cookies-tracking-technologies">
              10. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies and similar tracking technologies to enhance your
              experience on our website. Cookies are small text files stored on
              your device that help us understand how you interact with our
              services. You can control cookie preferences through your browser
              settings.
            </p>
            <br />

            <h3>Types of Cookies We Use:</h3>
            <ul>
              <li>
                Essential Cookies: These cookies are necessary for the website
                to function and cannot be switched off in our systems.
              </li>
              <li>
                Analytical Cookies: We use these cookies to understand how
                visitors interact with our website and improve user experience.
              </li>
              <li>
                Marketing Cookies: These cookies may be set through our site by
                our advertising partners to build a profile of your interests
                and show you relevant advertisements.
              </li>
            </ul>
          </section>

          <section aria-labelledby="third-party-links">
            <h2 id="third-party-links">11. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party sites. We do not
              control these websites and are not responsible for their content
              or privacy practices. We encourage you to review the privacy
              policies of any third-party sites you visit.
            </p>
          </section>

          <section aria-labelledby="international-data-transfare">
            <h2 id="international-data-transfare">
              12. International Data Transfers
            </h2>
            <p>
              If you are located outside of the European Economic Area (EEA),
              please note that we may transfer your personal data to countries
              that may not provide the same level of data protection as your
              home country. We will take necessary measures to ensure that your
              personal data is treated securely and in accordance with this
              Privacy Policy.
            </p>
          </section>

          <section aria-labelledby="childrens-privacy">
            <h2 id="childrens-privacy">{"13. Children's Privacy"}</h2>
            <p>
              Our services are designed for use by parents and guardians of
              children. We do not knowingly collect personal data from children
              under the age of 13 without parental consent. If we become aware
              that we have collected personal data from a child under 13 without
              parental consent, we will take steps to delete such information.
            </p>
          </section>

          <section aria-labelledby="govering-law">
            <h2 id="govering-law">14. Governing Law</h2>
            <p>
              This Privacy Policy is governed by and construed in accordance
              with the laws of the jurisdiction in which Child Records operates.
              Any disputes arising from this Privacy Policy shall be subject to
              the exclusive jurisdiction of the courts of that jurisdiction.
            </p>
          </section>

          <section aria-labelledby="your-consent">
            <h2 id="your-consent">15. Your Consent</h2>
            <p>
              By using our website, you consent to our Privacy Policy and agree
              to its terms. If you do not agree to this Privacy Policy, please
              do not use our services.
            </p>
            <br />
            <p>
              This Privacy Policy reflects our commitment to protecting your
              privacy and your rights regarding your personal data. We
              appreciate your trust in Child Records and will continue to
              prioritize your privacy in all our operations. If you have any
              questions or concerns, please do not hesitate to reach out to us
              at: support@childrecords.care
            </p>
          </section>
        </article>
      </main>
    </>
  );
};

export default PrivacyPolicy;
