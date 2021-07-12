package com.KuzminaIra.notes.database.repository;

import com.KuzminaIra.notes.database.entity.Access;
import com.KuzminaIra.notes.database.entity.Note;
import com.KuzminaIra.notes.database.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccessRepository extends JpaRepository<Access, String>  {
    List<Access> getByUser(User user);
    List<Access> getByNote(Note note);

}
