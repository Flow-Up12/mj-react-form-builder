import React from 'react';
import { useForm } from "react-hook-form";
import { ContactArrayInput } from "./components/ContactArrayInput";
import { Form } from "./components/FormProvider";
import { NotifyProvider } from "./components/NotificationProvider";
import Test from "./Test";

const App = () => {
  const methods = useForm();

  return (
    // <NotifyProvider>
    <Form
      defaultValues={{
        name: "Clearwater Utility",
        // type: "Primary",
        region: "Region 1",
        office_hours: "9 AM - 5 PM",
        meters: 1500,
        url: "https://clearwaterutility.org",
        board_meeting: "Second Tuesday of every month",
        funding: true,
        orwaag: false,
        workmans_comp: true,
        contacts: [
          {
            first: "John",
            last: "Doe",
            email: "johndoe@example.com",
            phone: "123-456-7890",
            title: "Manager",
          },
          {
            first: "Jane",
            last: "Smith",
            email: "janesmith@example.com",
            phone: "098-765-4321",
            title: "Assistant Manager",
          },
        ],
        county: "Cleveland",
        total_years: 25,
        member_type: "RWD",
        system_type_dirty: "Pur, Sew, Sur",
        email: "info@clearwaterutility.org",
        phone: "555-123-4567",
        fax: "555-765-4321",
        latitude: "35.2271",
        longitude: "-80.8431",
        address_mailing_pobox: "PO Box 123",
        address_mailing_city: "Clearwater",
        address_mailing_state: "Oklahoma",
        address_mailing_zip: "73020",
        address_physical_line1: "123 Water St.",
        address_physical_line2: "Suite 200",
        address_physical_city: "Clearwater",
        address_physical_state: "Oklahoma",
        address_physical_zip: "73020",
        annual_report_type: "Both",
        membership_directory_type: "Mail",
        payment_last_date: "2023-09-01T00:00:00Z", // ISO date string
        payment_method: "Invoice",
        payment_amount: 500.0,
        fee_connections: 50.0,
        fee_membership: 100.0,
        fee_scholarship: 25.0,
        fee_apprenticeship: 30.0,
        application_date: "2023-08-15T00:00:00Z", // ISO date string
        wp_uid: 12345,
        wp_eid: 67890,
        payment_details: "Paid via invoice",
        legal_entity_name: "Clearwater Utility Corporation",
        directory_sent_date: "2023-09-01T00:00:00Z", // ISO date string
        soonerwarn: true,
        directory_mailed: true,
        payment_previous_date: "2023-07-01T00:00:00Z", // ISO date string
      }}
    >
      <Test />
    </Form>
    // </NotifyProvider>
  );
};

export default App;
