package com.copeapp.utilities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import com.copeapp.entities.common.Classe;
import com.copeapp.entities.common.Role;
import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.Subject;
import com.copeapp.entities.common.Teacher;

public class PopulateDatabase {
	
	public static void doPopulate() {
		
		EntityManager entityManager = EntityManagerFactoryGlobal.getInstance().getEmfactory().createEntityManager();
		entityManager.getTransaction().begin();
		try {
			//riempiendo roles
			List<Role> roles = new ArrayList<Role>();
			roles.add(new Role("studente", "Studente"));
			roles.add(new Role("prof", "Professore"));
			roles.add(new Role("moderatore", "Moderatore"));
			roles.add(new Role("admin", "Amministratore"));
			roles.add(new Role("redattore", "Redattore"));
			roles.add(new Role("rappresentante", "Rappresentante"));
			
			for(Role r : roles) entityManager.persist(r);
			entityManager.getTransaction().commit();
			
			entityManager.getTransaction().begin();
			//riempiendo users
			Student student0 = new Student("FabioTex", "VincioGay", "Fabio", "Tessaro", roles, false);
			student0.setMail("fabio.tessaro.porta@gmail.com");
			student0.setImageUrl("");
			student0.setWallpaper("default");
			Student student1 = new Student("Gallo", "VincioGay", "Gianluca", "Galletti", roles, false);
			student1.setMail("gianlucagalletti@ymail.it");
			student1.setImageUrl("");
			student1.setWallpaper("default");
			Student student2 = new Student("Cerammerda", "VincioGay", "Luca", "Ceragioli", roles, false);
			student2.setMail("cerammerda@gioli.it");
			student2.setImageUrl("");
			student2.setWallpaper("default");
			Teacher teacher0 = new Teacher("Kyra69", "VincioGay", "Claudio", "Unguendoli", roles, false);
			teacher0.setMail("ungummerda@guendoli.it");
			teacher0.setImageUrl("");
			teacher0.setWallpaper("default");
			Teacher teacher1 = new Teacher("GabryFenoc", "VincioGay", "Gabriella", "Fenocchio", roles, false);
			teacher1.setMail("gabrifenoc@occhio.it");
			teacher1.setImageUrl("");
			teacher1.setWallpaper("default");
			entityManager.persist(teacher0);
			entityManager.persist(teacher1);
			entityManager.persist(student0);
			entityManager.persist(student1);
			entityManager.persist(student2);
			entityManager.getTransaction().commit();
			
			entityManager.getTransaction().begin();
			//riempiendo classes
			Classe class0 = new Classe(5, "F", "Scientifico applicato", teacher1);
			List<Student> rappresentanti0 = new ArrayList<Student>();
			rappresentanti0.add(student2);
			rappresentanti0.add(student0);
			class0.setRappresentanti(rappresentanti0);
			entityManager.persist(class0);
			Classe class1 = new Classe(5, "C", "Scientifico applicato", teacher0);
			List<Student> rappresentanti1 = new ArrayList<Student>();
			rappresentanti1.add(student1);
			class1.setRappresentanti(rappresentanti1);
			entityManager.persist(class1);
			entityManager.getTransaction().commit();
			
			entityManager.getTransaction().begin();
			//riempiendo la classe degli studenti
			student0.setClasse(class0);
			student1.setClasse(class1);
			student2.setClasse(class0);
			entityManager.getTransaction().commit();
			
			entityManager.getTransaction().begin();
			//riempiendo teachers_classes
			teacher1.setCoordinatorOf(class0);
			List<Classe> classi0 = new ArrayList<Classe>();
			classi0.add(class0);
			teacher1.setClassi(classi0);
			
			teacher0.setCoordinatorOf(class1);
			List<Classe> classi1 = new ArrayList<Classe>();
			classi1.add(class1);
			teacher0.setClassi(classi1);
			entityManager.getTransaction().commit();
			
			entityManager.getTransaction().begin();
			//riempiendo classes_teacher
			List<Teacher> teachers = new ArrayList<Teacher>();
			teachers.add(teacher1);
			teachers.add(teacher0);
			class0.setTeachers(teachers);
			class1.setTeachers(teachers);
			entityManager.getTransaction().commit();
			
			entityManager.getTransaction().begin();
			//riempiendo subjects
			Subject subject0 = new Subject("Italiano", "FF0000");
			Subject subject1 = new Subject("Informatica", "799946");
			entityManager.persist(subject0);
			entityManager.persist(subject1);
			entityManager.getTransaction().commit();
			
			entityManager.getTransaction().begin();
			//riempiendo subjects_teachers
			List<Teacher> teachers0 = new ArrayList<Teacher>();
			teachers0.add(teacher1);
			subject0.setTeachers(teachers0);
			List<Teacher> teachers1 = new ArrayList<Teacher>();
			teachers1.add(teacher0);
			subject1.setTeachers(teachers1);
			entityManager.getTransaction().commit();
			
			entityManager.getTransaction().begin();
			//riempiendo teachers_subjects
			List<Subject> subjects0 = new ArrayList<Subject>();
			subjects0.add(subject0);
			teacher1.setSubjects(subjects0);
			List<Subject> subjects1 = new ArrayList<Subject>();
			subjects1.add(subject1);
			teacher0.setSubjects(subjects1);
			entityManager.getTransaction().commit();
			
			entityManager.getTransaction().begin();
			//riempiendo gli studenti per la classe
			List<Student> students0 = new ArrayList<Student>();
			students0.add(student2);
			students0.add(student0);
			class0.setStudents(students0);
			List<Student> students1 = new ArrayList<Student>();
			students1.add(student1);
			class0.setStudents(students1);
			
		} finally {
			entityManager.getTransaction().commit();
			entityManager.close();
		}
	}

}
