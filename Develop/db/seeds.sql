INSERT INTO departments (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance'),
  ('Human Resources');

INSERT INTO roles (title, salary, department_id) VALUES
  ('Sales Manager', 80000, 1),
  ('Sales Representative', 50000, 1),
  ('Marketing Manager', 75000, 2),
  ('Marketing Specialist', 55000, 2),
  ('Finance Manager', 90000, 3),
  ('Financial Analyst', 60000, 3),
  ('HR Manager', 85000, 4),
  ('HR Assistant', 45000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 3, NULL),
  ('Emily', 'Davis', 4, 3),
  ('David', 'Brown', 5, NULL),
  ('Sarah', 'Wilson', 6, 5),
  ('Michael', 'Taylor', 7, NULL),
  ('Jessica', 'Anderson', 8, 7);
